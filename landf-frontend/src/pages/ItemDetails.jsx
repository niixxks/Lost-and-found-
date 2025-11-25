import { useParams } from "react-router-dom";

export default function ItemDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      <p className="text-gray-700">Item ID from URL: {id}</p>
    </div>
  );
}
