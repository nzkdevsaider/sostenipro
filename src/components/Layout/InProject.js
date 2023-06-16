import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"];

export const data = {
  labels,
  datasets: [
    {
      label: "Puntuación de Impacto",
      data: labels.map(() => faker.number.int({ min: 1, max: 10 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "kgCO2e",
      data: labels.map(() => faker.number.int({ min: 100, max: 500 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const InProject = ({ project }) => {
  return (
    <div className="mx-10 space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-gray-300 h-[100px] w-[200px] rounded-md flex flex-row justify-center items-center">
          <span className="text-4xl">
            {faker.number.int({ min: 100, max: 500 })}
          </span>
          <span className="pt-2">kgCO2e</span>
        </div>
        <div className="bg-gray-300 h-[100px] w-[200px] rounded-md flex flex-row justify-center items-center">
          <span className="text-4xl">
            {faker.number.int({ min: 20, max: 100 })}
          </span>
          <span className="pt-2">litros</span>
        </div>
        <div className="bg-gray-300 h-[100px] w-[200px] rounded-md flex flex-row justify-center items-center">
          <span className="text-4xl">
            {faker.number.int({ min: 60, max: 110 })}
          </span>
          <span className="pt-2">kWh</span>
        </div>
      </div>
      <div className="bg-gray-300 h-full w-full rounded-md p-5">
        <h1 className="text-4xl">Historial</h1>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default InProject;
