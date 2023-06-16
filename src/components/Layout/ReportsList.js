import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Separator from "@sostenipro/components/Separator/Separator";
import { EyeIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Button, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
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
import { getProjects } from "@sostenipro/utils/dbOperations";

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

const ReportsList = ({ user }) => {
  const client = useSupabaseClient();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleProjects();
    setLoading(true);
  }, []);

  const handleProjects = async () => {
    const projectslist = await getProjects(user.id, client);
    setLoading(false);
    setProjects(projectslist);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4">
        <h1 className="text-4xl">Informes</h1>
      </div>
      <Separator my="5" />
      {loading && (
        <div className="flex flex-col items-center justify-center my-20">
          <Spinner size="lg" className="h-12 w-12" />
        </div>
      )}
      {projects?.length === 0 && (
        <div className="flex flex-col items-center justify-center my-20">
          <h2 className="text-2xl">No hay informes aún</h2>
          <p className="text-blue-gray-500">
            Crea un proyecto para empezar a consultar informes
          </p>
        </div>
      )}
      <div className="grid grid-flow-row grid-cols-3 gap-4">
        {projects?.map((project) => (
          <div
            className="projectlist h-[300px] w-[300px] bg-blue-gray-100 rounded-lg p-5 flex flex-col justify-between"
            key={project.id}
          >
            <h2 className="text-2xl">{project.name}</h2>

            <Line options={options} data={data} />
            <div className="flex flex-row gap-3">
              <Button size="sm" className="flex flex-row items-center gap-2">
                <EyeIcon className="h-5 w-5" /> Ver informe
              </Button>
              <Button
                size="sm"
                className="flex flex-row items-center gap-2"
                color="green"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;
