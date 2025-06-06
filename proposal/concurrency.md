# Problem statement

All calculations currently go through a single web worker, which has several downsides:

- Only one operation can run off the main (UI) thread at a time
- Users must wait for results before seeing any output
- There's no way to cancel long-running operations except by closing the browser tab

# Suggested solution

## Enable more web workers

We should support spawning additional workers for ongoing processes. This should be a drop-in replacement for the current `rngTools` module, handling worker creation and cleanup automatically.

```ts
// Currently
const results = await rngTools.search_dppt_ids(opts);

// After
const results = await multiWorkerRngTools.search_dppt_ids(opts);
```

If this works well, we can remove the old `rngTools` and rename `multiWorkerRngTools` back to `rngTools`.

We'll need to be careful not to spawn too many workers at once, since that can cause performance issues. Concurrency limiting tools will be added in the next section of this document.

## Batching and concurrency

Let's add a React hook for running batchable functions with streaming, cancellation, and progress.

### Batchable function

We should define a _batchable function_ that has an easy structure to parallelize and stream results.

It should be a function that:

- Takes a single argument
- Returns a promise that resolves to a list

For example:

```ts
const mult2 = async (num: number) => [num * 2];
```

### `useBatchedTool` hook

To make use a batchable function with chunked args, we'll add a new hook called `useBatchedTool`. It takes a batchable function and returns a function that accepts a list of the same input type.

```ts
const { run: doMath } = useBatchedTool(mult2);
const result = await doMath([1, 2, 3]);
console.log(result); // [2, 4, 6]
```

`useBatchedTool` returns an object:

```ts
type BatchedTool<Arg, Ret, MappedRet = Ret> {
  run: (args: Arg[]) => Ret[]; // Process the chunked args
  cancel: () => void; // Cancel the operation
  data: MappedRet[]; // Current processed data
  loading: boolean; // If is processing processing
  progressPercent: number; // processedArgs / totalArgs * 100
  error: Error | null; // An error caught while process a chunk
}
```

### Mapping results

We often need to add additional data to results, such as the offset between a result and target advance.

`useBatchedTool` should support a second argument with options to transform the results:

```ts
type BatchedToolOptions<Result, MappedResult = Result> {
  map?: (res: Result) => MappedResult;
  sortBy?: (res: MappedResult) => MappedResult;
}
```

In this example we're multiplying the number as before, but transforming the result into an object.

```ts
const mapper = (num: number) => ({ num });
const sorter = (num: number) => 0 - num;
const { run: doMath } = useBatchedTool(mult2, { map: mapper, sortBy: sorter });
const result = await doMath([1, 2, 3]);
console.log(result); // [{ num: 6 }, { num: 4 }, { num: 2 }]
```

### Concurrency

Because `useBatchedTool` allows calling a batchable function multiple times, it should also run those calculations in parallel.

Consider these functions where `getTime` waits 1 second before resolving with a timestamp:

```ts
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getTime = async (id: number) => {
  await sleep(1000); // Sleep for 1 second
  const time = new Date().toLocaleTimeString("en-US");
  return `${id}: ${time}`;
};
```

Running sequential takes 3 seconds. Notice how the results are 1 second apart.

```ts
const sequential = [await getTime(1), await getTime(2), await getTime(3)];
console.log(sequential); //["1: 7:13:12 PM", "2: 7:13:13 PM", "3: 7:13:14 PM"]
```

Using `useBatchedTool`, we get concurrent results. Notice how the results share the same timestamp.

```ts
const { run: batchedTime } = useBatchedTool(getTime);
const concurrent = await batchedTime([1, 2, 3]);
console.log(concurrent); // ["1: 7:13:15 PM", "2: 7:13:15 PM", "3: 7:13:15 PM"]
```

This allows us to get calculations done faster.

Concurrency should be the minimum of 4 (generally safe number of workers) and [`window.navigator.hardwareConcurrency`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/hardwareConcurrency).

### Streamed results

We should be able to access results as they're processed so users can see results as they're found.

The example below shows the logging that occurs each render as new results are available. Notice how new results are logged over a few seconds.

```ts
const { run: doMath, data } = useBatchedTool(mult2);

console.log(timestamp(), data);
// 7:26:31 PM [2, 4]
// 7:26:31 PM [2, 4, 6, 8]
// 7:26:32 PM [2, 4, 6, 8, 10, 12]

React.useEffect(() => {
  doMath([1, 2, 3, 4, 5, 6]);
}, [doMath]);
```

### Cancelling

The hook should provide a way to cancel an in-progress operation. Notice how the log only happens a single time.

```ts
const { run: doMath, data, cancel } = useBatchedTool(mult2);

console.log(timestamp(), data);
// 7:26:31 PM [2, 4, 6, 8]

React.useEffect(() => {
  setTimeout(cancel, 1500); // Cancel after 1.5 seconds
}, [cancel]);

React.useEffect(() => {
  doMath([1, 2, 3, 4, 5, 6]);
}, [doMath]);
```

Even after canceling, the most recent results remain.

### Loading, progress, and errors

The hook should expose the current loading state, progress percentage, and any error that occurs. Notice how progress incremeents over time.

```ts
const { run: doMath, loading, progressPercent, error } = useBatchedTool(mult2);

console.log(loading, progressPercent, error);
// true 0 null
// true 66 null
// true 83 null
// false 100 null

React.useEffect(() => {
  doMath([1, 2, 3, 4, 5, 6]);
}, [doMath]);
```

## Practical example

Most of our existing RNG tools are already batchable, so they should work out of the box with `useBatchedTool`.

In this example, we:

- Use `multiWorkerRngTools` for multi-threading
- Use `useBatchedTool` for concurrency with a safe worker limit
- Add `calculateOffset` to transform results
- Display progress to the user
- Offer a cancel button
- Stream results as they complete

```ts
type Result = Id4 & { offset: number };

const calculateOffset = (result: Id4): Result => ({
  ...result,
  offset: offset.advance - targetAdvance,
});

const { run: searchDpptIds, data, progressPercent, loading, cancel } =
  useBatchedTool(multiWorkerRngTools.search_dppt_ids, calculateOffset);

const onSubmit = async (opts: FormState) => {
  // If a user used min_delay: 5000, max_delay: 5800,
  // `chunkId4Options` would split `opts` into this:
  // [
  //   { ...opts, min_delay: 5000, max_delay: 5200 },
  //   { ...opts, min_delay: 5200, max_delay: 5400 },
  //   { ...opts, min_delay: 5400, max_delay: 5600 },
  //   { ...opts, min_delay: 5600, max_delay: 5800 },
  // ];

  const chunked = chunkId4Options(opts);
  await searchDpptIds(chunked);
  message.success("Finished!");
};

return (
  <RngToolForm<FormState, Result>
    results={data}
    onSubmit={onSubmit}
    // other props
  >
    <Fields />
    <Button onClick={cancel}>Cancel</Button>
    {loading && <Progress percent={progressPercent} />}
  </RngToolForm>
);
```

`RngToolForm` will need updates to make full use of these features.
