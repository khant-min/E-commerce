import { useEffect, useState } from "react";
import AnalyzeService from "../../services/AnalyzeService";

interface AnalyzeData {
  customers: number;
  categories: number;
  products: number;
  visitors: number;
}

export default function HomePage() {
  const [analyzedData, setAnalyzedData] = useState<AnalyzeData>();

  const fetchData = async () => {
    const res = await AnalyzeService.getList();
    console.log("res: ", res);
    setAnalyzedData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <div className="shadow-lg p-6">
        <h2 className="text-4xl font-sans">144 Visitors</h2>
        <p className="text-green-500 text-lg font-semibold text-end">12% Up</p>
      </div>
      <div className="shadow-lg p-6">
        <h2 className="text-4xl font-sans">
          {analyzedData?.customers} Customers
        </h2>
        <p className="text-green-500 text-lg font-semibold text-end">4% Up</p>
      </div>
      <div className="shadow-lg p-6">
        <h2 className="text-4xl font-sans">
          {analyzedData?.products} Products
        </h2>
        <p className="text-green-500 text-lg font-semibold text-end">10% Up</p>
      </div>
      <div className="shadow-lg p-6">
        <h2 className="text-4xl font-sans">{analyzedData?.categories}</h2>
        <p className="text-green-500 text-lg font-semibold text-end">10% Up</p>
      </div>
    </div>
  );
}
