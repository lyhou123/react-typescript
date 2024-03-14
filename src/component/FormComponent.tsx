
import { Label, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

type ErrorType = {
  price: string;
  title: string;
};
function FormComponent ({ getDataForm }: any) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("electronic");
  const [image, setImage] = useState(
    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
  );
  const [error, setError] = useState<ErrorType>({
    price: "",
    title: "",
  });
  useEffect(() => {
    if (title.length < 3) {
      setError((prev) => {
        console.log(prev);
        return {
          ...prev,
          title: "Title must be at least 3 characters long",
        };
      });
    } else {
      setError((prev) => {
        console.log(prev);
        return {
          ...prev,
          title: "",
        };
      });
    }

    if (price < 0) {
      setError((prev) => {
        console.log(prev);
        return {
          ...prev,
          price: "price must be at least 1$",
        };
      });
    } else {
      setError((prev) => {
        console.log(prev);
        return {
          ...prev,
          price: "",
        };
      });
    }
  }, [price, title]);
  useEffect(() => {
    getDataForm({ title, price, description, category, image });
  }, [title, price, description, category, image]);
  return (
    <>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Product Name" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Product Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          {error.title && <p className="text-red-500">{error.title}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Product Price" />
          </div>
          <TextInput
            id="price"
            type="number"
            required
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
          {error.price && <p className="text-red-500">{error.price}</p>}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="description" value="Product Description" />
          </div>
          <Textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default FormComponent;
