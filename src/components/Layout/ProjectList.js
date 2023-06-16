import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Separator from "@sostenipro/components/Separator/Separator";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getProjects, createProject } from "@sostenipro/utils/dbOperations";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/solid";

const ProjectList = ({ user }) => {
  const client = useSupabaseClient();
  const [projects, setProjects] = useState(null);
  const [openCreator, setOpenCreator] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleProjects();
    setLoading(true);
  }, []);

  const handleOpenCreator = () => {
    setOpenCreator((cur) => !cur);
  };

  const onProjectCreation = async () => {
    await createProject(user.id, client, name, "", "");
    await handleProjects();
    handleOpenCreator();
  };

  const handleProjects = async () => {
    const projectslist = await getProjects(user.id, client);
    setLoading(false);
    setProjects(projectslist);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-4">
        <h1 className="text-4xl">Proyectos</h1>
        <Button
          variant="outlined"
          size="sm"
          className="flex items-center gap-3 rounded-full"
          onClick={handleOpenCreator}
        >
          <PlusCircleIcon className="h-6 w-6" />
          Crear proyecto
        </Button>
        <Dialog
          open={openCreator}
          onClose={handleOpenCreator}
          size="md"
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Crear nuevo proyecto
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Nombre del proyecto"
                size="lg"
                onChange={(e) => setName(e.target.value)}
              />
            </CardBody>
            <CardFooter className="pt-0 space-y-3">
              <Button
                variant="gradient"
                color="green"
                onClick={onProjectCreation}
                fullWidth
              >
                Crear
              </Button>
              <Button
                variant="gradient"
                color="red"
                onClick={handleOpenCreator}
                fullWidth
              >
                Cerrar
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </div>
      <Separator my="5" />
      {loading && (
        <div className="flex flex-col items-center justify-center my-20">
          <Spinner size="lg" className="h-12 w-12" />
        </div>
      )}
      {projects?.length === 0 && (
        <div className="flex flex-col items-center justify-center my-20">
          <h2 className="text-2xl">¡No hay proyectos!</h2>
          <p className="text-blue-gray-500 flex flex-row gap-2 items-center">
            Presiona el ícono <PlusCircleIcon className="h-5 w-5" /> para crear
            uno.
          </p>
        </div>
      )}
      <div className="grid grid-flow-row grid-cols-3 gap-4">
        {projects?.map((project) => (
          <div
            className="projectlist h-[100px] w-[300px] bg-blue-gray-100 hover:bg-blue-gray-200 rounded-lg p-5"
            key={project.id}
          >
            <Link href={`/app/project/${project.id}`}>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <h2 className="text-2xl">{project.name}</h2>
                  <div className="badges flex flex-row items-center gap-3">
                    <div className="flex flex-row items-center justify-center bg-black rounded-full h-5 w-12">
                      <ArrowTrendingUpIcon className="text-white h-4 w-4" />
                      <span className="text-white text-sm">5</span>
                      <span className="text-gray-400 text-xs">/10</span>
                    </div>
                  </div>
                  <p className=" text-blue-gray-900">{project.description}</p>
                </div>
                <ArrowRightCircleIcon className="text-gray-800 h-10 w-10" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
