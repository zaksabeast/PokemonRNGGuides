pub mod arrayvec {
    use arrayvec::ArrayVec;
    use serde::{
        Deserialize, Deserializer, Serialize, Serializer,
        de::{Error, SeqAccess, Visitor},
    };
    use std::{fmt, marker::PhantomData};

    pub fn serialize<S, T, const N: usize>(
        arrayvec: &ArrayVec<T, N>,
        serializer: S,
    ) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
        T: Serialize,
    {
        arrayvec.as_slice().serialize(serializer)
    }

    pub fn deserialize<'de, D, T, const N: usize>(
        deserializer: D,
    ) -> Result<ArrayVec<T, N>, D::Error>
    where
        D: Deserializer<'de>,
        T: Deserialize<'de>,
    {
        struct ArrayVecVisitor<T, const N: usize> {
            marker: PhantomData<T>,
        }

        impl<'de, T, const N: usize> Visitor<'de> for ArrayVecVisitor<T, N>
        where
            T: Deserialize<'de>,
        {
            type Value = ArrayVec<T, N>;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                write!(formatter, "a sequence of at most {N} items")
            }

            fn visit_seq<A>(self, mut seq: A) -> Result<Self::Value, A::Error>
            where
                A: SeqAccess<'de>,
            {
                if let Some(len) = seq.size_hint()
                    && len > N
                {
                    return Err(A::Error::invalid_length(len, &self));
                }

                let mut arrayvec = ArrayVec::new();
                while let Some(item) = seq.next_element()? {
                    arrayvec
                        .try_push(item)
                        .map_err(|_| A::Error::invalid_length(N + 1, &self))?;
                }

                Ok(arrayvec)
            }
        }

        deserializer.deserialize_seq(ArrayVecVisitor {
            marker: PhantomData,
        })
    }
}
