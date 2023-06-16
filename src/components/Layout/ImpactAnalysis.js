import { ArrowTrendingUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";

const p5 = ["Producto", "Procesos", "Personas", "Planeta", "Prosperidad"];

const ImpactAnalysis = () => {
  return (
    <div className="flex flex-col gap-4">
      {p5.map((p) => (
        <div className="flex flex-row h-[200px] w-full bg-gray-300 rounded-md">
          <div className="flex flex-col justify-between items-start p-10">
            <h1 className="text-4xl">{p}</h1>
            <Button size="sm" className="flex flex-row items-center gap-2"><PlusCircleIcon className="h-5 w-5" /> Añadir impacto</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactAnalysis;
