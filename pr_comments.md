# PR #485 comments

Source: [PokemonRNGGuides PR #485](https://github.com/zaksabeast/PokemonRNGGuides/pull/485)

Includes inline review comments and replies (including outdated comments), review summaries, and discussion comments.

## Inline review comments

### @RainingChain - rng_tools/src/generators/gen3/egg/emerald_held.rs:470

Created: 2026-10-12T00:06:32Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243804689)
Original line: 470
Diff side: RIGHT

Always import instead of prefixing by crate::

<details>
<summary>Diff context</summary>

```diff
@@ -466,7 +467,7 @@ mod test {
             egg_species: Species::Bulbasaur,
             filters: Egg3HeldFilters {
                 ability: None,
-                shiny: false,
+                shiny: crate::ShinyFilter::Any,
```

</details>

### @RainingChain - rng_tools/src/generators/gen3/static3/searcher.rs:384

Created: 2026-10-12T00:08:40Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243810360)
Original line: 384
Diff side: RIGHT

Remove that test

<details>
<summary>Diff context</summary>

```diff
@@ -379,3 +380,36 @@ mod test {
         );
     }
 }
+
+#[cfg(test)]
```

</details>

### @RainingChain - rng_tools/src/generators/gen3/wild/searcher/pid_path.rs:42

Created: 2026-10-12T00:09:51Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243813584)
Original line: 42
Diff side: RIGHT

Rename trainer_xor by tsv_trv.
Create a new struct TsvTrv {
   tid_xor_sid:u16
}.
Add tsv_gen3_to_5(), tsv_gen6_more() and trv() functions to it.
from_tid_sid(tid, sid)

Create PsvPrv too. from_pid(pid).

<details>
<summary>Diff context</summary>

```diff
@@ -39,7 +39,7 @@ pub struct FindPidPathsOptions {
     pub gen3_filter: Gen3PkmFilter,
     pub encounter_gender_ratio: GenderRatio,
     pub method_bitset: u8,
-    pub tsv: u16,
+    pub trainer_xor: u16,
```

</details>

### @RainingChain - rng_tools/src/generators/gen3/wild/searcher/pid_path_strategy.rs:203

Created: 2026-10-12T00:14:44Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243827681)
Original line: 203
Diff side: RIGHT

Optimize the logic to filter pid based on opts.filter.shiny.
Only return pids with the wanted shininess.

<details>
<summary>Diff context</summary>

```diff
@@ -200,7 +200,7 @@ pub fn find_pid_paths_reverse_pid_cycle_speed_mid<const METHODS: u8>(
 pub fn find_pid_paths_reverse_pid_shiny<const METHODS: u8>(
     opts: &FindPidPathsOptions,
 ) -> impl Iterator<Item = PidPath> {
-    let full_tsv: u32 = (opts.tsv as u32) << 3;
+    let full_tsv: u32 = ((opts.trainer_xor >> 3) as u32) << 3;
```

</details>

### @RainingChain - rng_tools/src/generators/gen3/wild/filter.rs:44

Created: 2026-10-12T00:16:05Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243831796)
Original line: 44
Diff side: RIGHT

Add ShinyType::from_pid_tid_xor_sid_gen3_to_5(pid, tid_xor_sid)
Add ShinyType::from_pid_tid_xor_sid_gen6_plus(pid, tid_xor_sid)

<details>
<summary>Diff context</summary>

```diff
@@ -40,13 +39,11 @@ pub fn passes_pid_filter(
     gen3_filter: &Gen3PkmFilter,
     encounter_gender_ratio: Option<GenderRatio>,
     pid: u32,
-    tsv: u16,
+    trainer_xor: u16,
 ) -> bool {
-    if filter.shiny {
-        let generated_shiny = gen3_psv(pid) == tsv;
-        if !generated_shiny {
-            return false;
-        }
+    let shiny = crate::ShinyType::from_xor((pid >> 16) as u16 ^ pid as u16 ^ trainer_xor, 8);
```

</details>

### @RainingChain - rng_tools/src/generators/gen3/wild/filter.rs:164

Created: 2026-10-12T00:17:02Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243834414)
Original line: 164
Diff side: RIGHT

Remove the test.

<details>
<summary>Diff context</summary>

```diff
@@ -159,3 +159,22 @@ pub fn get_filter_restrictiveness(
 
     prob
 }
+
+#[cfg(test)]
+mod shiny_tests {
```

</details>

### @RainingChain - rng_tools/src/generators/gen4/egg/held_generator.rs:202

Created: 2026-10-12T00:17:46Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243836433)
Original line: 202
Diff side: RIGHT

Remove

<details>
<summary>Diff context</summary>

```diff
@@ -197,6 +198,29 @@ mod tests {
         };
     }
 
+    #[test]
+    fn shiny_subtype_filters_do_not_change_masuda_rerolls() {
```

</details>

### @RainingChain - rng_tools/src/pkm/shiny.rs:15

Created: 2026-10-12T00:30:32Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#discussion_r4243875276)
Original line: 15
Diff side: RIGHT

Remove all gen6_tsv. Use tid_xor_sid instead.

<details>
<summary>Diff context</summary>

```diff
@@ -8,8 +8,8 @@ pub fn gen3_psv(pid: u32) -> u16 {
     (pidh ^ pidl) >> 3
 }
 
-pub fn gen3_shiny(pid: u32, tid: u16, sid: u16) -> bool {
-    gen3_psv(pid) == gen3_tsv(tid, sid)
+pub fn gen3_shiny(pid: u32, tid: u16, sid: u16) -> ShinyType {
+    ShinyType::from_xor(((pid >> 16) as u16) ^ (pid as u16) ^ tid ^ sid, 8)
 }
 
 pub fn gen6_tsv(tid: u16, sid: u16) -> u16 {
```

</details>

## Review summaries

### @RainingChain - COMMENTED

Created: 2026-10-12T00:06:32Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485612590)

_No summary text._

### @RainingChain - COMMENTED

Created: 2026-10-12T00:08:40Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485618823)

_No summary text._

### @RainingChain - COMMENTED

Created: 2026-10-12T00:09:51Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485622184)

_No summary text._

### @RainingChain - COMMENTED

Created: 2026-10-12T00:14:44Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485637005)

_No summary text._

### @RainingChain - COMMENTED

Created: 2026-10-12T00:16:05Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485641101)

_No summary text._

### @RainingChain - COMMENTED

Created: 2026-10-12T00:17:02Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485643892)

_No summary text._

### @RainingChain - COMMENTED

Created: 2026-10-12T00:17:46Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485646013)

_No summary text._

### @RainingChain - COMMENTED

Created: 2026-10-12T00:30:32Z
Link: [View on GitHub](https://github.com/zaksabeast/PokemonRNGGuides/pull/485#pullrequestreview-5485685263)

_No summary text._

## PR discussion comments

_None._
