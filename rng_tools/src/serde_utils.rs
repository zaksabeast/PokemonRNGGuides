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
                if let Some(len) = seq.size_hint() {
                    if len > N {
                        return Err(A::Error::invalid_length(len, &self));
                    }
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

pub mod vec_vec {
    use serde::{
        ser::SerializeSeq,
        Serialize, Serializer,
    };

    pub fn serialize<S, T>(vec: &[Vec<T>], serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
        T: Serialize,
    {
        let mut seq = serializer.serialize_seq(Some(vec.len()))?;
        for inner in vec {
            seq.serialize_element(&InnerVec(inner))?;
        }
        seq.end()
    }

    struct InnerVec<'a, T>(&'a [T]);

    impl<T> Serialize for InnerVec<'_, T>
    where
        T: Serialize,
    {
        fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
        {
            let mut seq = serializer.serialize_seq(Some(self.0.len()))?;
            for item in self.0 {
                seq.serialize_element(item)?;
            }
            seq.end()
        }
    }
}
