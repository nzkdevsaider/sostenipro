import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useRouter } from "next/router";

import {
  DocumentChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

import ProjectList from "@sostenipro/components/Layout/ProjectList";
import ReportsList from "@sostenipro/components/Layout/ReportsList";
import AccountNavBar from "@sostenipro/components/AccountNavBar/AccountNavBar";
import Sidebar from "@sostenipro/components/SideBar/Sidebar";
import useLocalStorage from "@sostenipro/utils/useLocalStorage";

const navElements = [
  {
    name: "Proyectos",
    icon: <Squares2X2Icon className="h-5 w-5" />,
    id: "proyectos",
  },
  {
    name: "Informes",
    icon: <DocumentChartBarIcon className="h-5 w-5" />,
    id: "informes",
  },
];

const AppPage = ({ user }) => {
  const router = useRouter();
  const [nav, setNav] = useState(router.query.nav ?? "proyectos");
  const [demowarn, setSetDemoWarn] = useLocalStorage("demowarn", true);

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
        pathname: "/app",
        query: { nav },
      },
      undefined,
      { shallow: true }
    );
    setNav(nav);
  };
  return (
    <div>
      <Dialog open={demowarn}>
        <DialogHeader>Aviso de prototipo</DialogHeader>
        <DialogBody divider>
          ¡Bienvenido a la vista previa del prototipo!
          <br />
          Esta vista previa tiene como propósito la evaluación de su interfaz y usabilidad,
          por lo tanto, algunas funcionalidades mostradas no podrían funcionar
          aún.
          <br />
          Tu opinión es muy importante para nosotros.
        </DialogBody>
        <DialogFooter>
          <Button onClick={() => setSetDemoWarn(false)} color="blue">
            ¡Entendido!
          </Button>
        </DialogFooter>
      </Dialog>
      <Sidebar>
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
        </List>
      </Sidebar>
      <AccountNavBar />
      <div className="ml-72 p-4">
        {nav === "proyectos" && <ProjectList user={user} />}
        {nav === "informes" && <ReportsList user={user} />}
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
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

  return {
    props: {
      user: session.user,
    },
  };
}

export default AppPage;
