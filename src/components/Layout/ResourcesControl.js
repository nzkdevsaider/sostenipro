import { Button, Chip, Input } from "@material-tailwind/react";
import { getFormalDay } from "@sostenipro/utils/tmConversion";
import Separator from "../Separator/Separator";
import { faker } from "@faker-js/faker";
import { BoltIcon, FunnelIcon } from "@heroicons/react/24/solid";

const ResourcesControl = () => {
  return (
    <div className="space-y-5">
      <h1 className="text-4xl">Control de recursos</h1>
      <Separator my="2" />
      <div className="bg-gray-300 flex flex-col justify-center rounded-md gap-3 p-10">
        <h1 className="text-2xl">
          Registra los recursos utilizado el día de hoy
        </h1>
        <span className="text-gray-800 text-sm italic">
          {getFormalDay(new Date())}
        </span>
        <div className="space-y-4">
          <Input label="kWh" />
          <Input label="litros" />
        </div>
        <Button color="blue" variant="filled">
          Registrar
        </Button>
      </div>
      <div className="bg-gray-300 flex flex-col justify-center rounded-md gap-3 p-10">
        <h1 className="text-2xl">Historial</h1>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-3">
            <Chip color="indigo" variant="gradient" value="11 de mayo" />
            <div className="flex flex-row gap-1">
              <BoltIcon className="h-5 w-5 text-yellow-900" />
              <span className="text-gray-700">
                {faker.number.int({ min: 10, max: 120 })} kWh
              </span>
            </div>
            <div className="flex flex-row gap-1">
              <FunnelIcon className="h-5 w-5 text-blue-900" />
              <span className="text-gray-700">
                {faker.number.int({ min: 10, max: 120 })} litros
              </span>
            </div>
            <Button color="blue" variant="filled" size="sm">
              Editar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesControl;
