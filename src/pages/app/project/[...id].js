import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useRouter } from "next/router";
import AccountNavBar from "@sostenipro/components/AccountNavBar/AccountNavBar";
import InProject from "@sostenipro/components/Layout/InProject";
import Sidebar from "@sostenipro/components/SideBar/Sidebar";
import Separator from "@sostenipro/components/Separator/Separator";

import { useEffect, useState } from "react";
import ImpactAnalysis from "@sostenipro/components/Layout/ImpactAnalysis";
import ResourcesControl from "@sostenipro/components/Layout/ResourcesControl";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  DocumentIcon,
  PresentationChartBarIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { getUserProject } from "@sostenipro/utils/dbOperations";

const navElements = [
  {
    name: "Vista general",
    icon: <RectangleGroupIcon className="h-5 w-5" />,
    id: "vista-general",
  },
  {
    name: "Análisis de impacto",
    icon: <PresentationChartBarIcon className="h-5 w-5" />,
    id: "imp-analisis",
  },
  {
    name: "Control de recursos",
    icon: <CalendarDaysIcon className="h-5 w-5" />,
    id: "control-recursos",
  },
];
const Project = ({ project }) => {
  const router = useRouter();
  const [nav, setNav] = useState(router.query.nav ?? "vista-general");

  useEffect(() => {
    if (checkNavIsValid(router.query.nav)) {
      setNav(router.query.nav);
    }
  }, [router.query.nav]);

  const checkNavIsValid = (nav) => {
    return navElements.some((element) => element.id === nav);
  };

  const changeNav = (nav) => {
    router.push(
      {
        pathname: `/app/project/${project.id}`,
        query: { nav },
      },
      undefined,
      { shallow: true }
    );
    setNav(nav);
  };

  return (
    <div className="">
      <Sidebar>
        <div className="flex flex-row justify-start items-center px-5 gap-3">
          <DocumentIcon className="h-5 w-5 fill-blue-gray-800" />
          <h1 className="text-2xl">{project.name}</h1>
        </div>
        <Separator my="2" />
        <List>
          {navElements.map((element) => (
            <ListItem
              key={element.id}
              onClick={() => changeNav(element.id)}
              ripple={true}
              className={`${
                nav === element.id
                  ? "bg-blue-gray-100 text-blue-gray-800"
                  : "text-blue-gray-500"
              }`}
            >
              <ListItemPrefix>{element.icon}</ListItemPrefix>
              {element.name}
            </ListItem>
          ))}
          <Separator my="2" />
          <Link href="/app">
            <ListItem>
              <ListItemPrefix>
                <ArrowLeftIcon className="h-5 w-5" />
              </ListItemPrefix>
              Volver a la lista de proyectos
            </ListItem>
          </Link>
        </List>
      </Sidebar>
      <AccountNavBar />
      <div className="ml-72 p-4">
        {nav === "vista-general" && <InProject project={project} />}
        {nav === "imp-analisis" && <ImpactAnalysis />}
        {nav === "control-recursos" && <ResourcesControl />}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const client = createPagesServerClient(ctx);
  const {
    data: { session },
  } = await client.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  try {
    const project = await getUserProject(session.user.id, id, client);
    return {
      props: {
        user: session.user,
        project: project[0],
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }
}

export default Project;
