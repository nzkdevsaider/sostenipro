/* Projects */

/* Create */

/**
 * Esta función crea un nuevo proyecto en una base de datos con el ID de usuario, el cliente, el
 * nombre, la descripción y el nombre del proyecto especificados.
 * @param userId - El ID del usuario que está creando el proyecto.
 * @param client - El parámetro de cliente es probablemente una instancia de un cliente de base de
 * datos, como el que proporciona la biblioteca de PostgreSQL. Se utiliza para conectarse e interactuar
 * con una base de datos.
 * @param name - El nombre del proyecto.
 * @param description - El parámetro de descripción es una cadena que describe el proyecto que se está
 * creando. Proporciona información adicional sobre el propósito, los objetivos o las características
 * del proyecto.
 * @param projectname - El parámetro `projectname` es una cadena que representa el nombre del proyecto
 * que se está creando.
 * @returns el objeto de datos que se recibe después de insertar un nuevo proyecto en la tabla
 * "proyectos" en la base de datos. Si hay un error, se registrará en la consola pero no se devolverá.
 */
export const createProject = async (userId, client, name) => {
  const { data, error } = await client.from("projects").insert([
    {
      user_id: userId,
      name: name,
    },
  ]);
  if (error) {
    throw error;
  }
  return data;
};

/* Get */

/**
 * Esta función recupera todos los proyectos asociados con un ID de usuario dado de una base de datos
 * usando un cliente.
 * @param userId - El ID del usuario cuyos proyectos se están recuperando.
 * @param client - El parámetro del cliente es probablemente una instancia del cliente de Supabase, que
 * se utiliza para interactuar con una base de datos de Supabase. Le permite realizar varias
 * operaciones de base de datos, como consultar, insertar, actualizar y eliminar datos.
 * @returns La función `getProjects` devuelve los datos de todos los proyectos que pertenecen a un
 * usuario específico, tal como se recuperaron de la base de datos utilizando el objeto `cliente`. Si
 * hay un error durante la consulta de la base de datos, la función registra el error en la consola.
 */
export const getProjects = async (userId, client) => {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * Esta función recupera los datos del proyecto de un usuario de una base de datos utilizando su ID de
 * usuario y su ID de proyecto.
 * @param userId - El ID del usuario cuyo proyecto se está recuperando.
 * @param projectId - El parámetro `projectId` es un identificador único para un proyecto específico
 * que pertenece a un usuario con el parámetro `userId`. La función usa este parámetro para consultar
 * la base de datos y recuperar los datos del proyecto asociados con ella.
 * @param client - El parámetro `cliente` es probablemente una instancia del cliente `supabase`, que se
 * utiliza para interactuar con una base de datos Supabase. Le permite realizar varias operaciones de
 * base de datos, como consultar, insertar, actualizar y eliminar datos.
 * @returns La función `getUserProject` devuelve los datos de un proyecto con un `projectId` específico
 * perteneciente a un usuario con un `userId` específico. Los datos se recuperan de la tabla
 * `proyectos` utilizando el objeto `cliente`, que se supone que es una conexión a una base de datos.
 * Si ocurre un error durante la consulta de la base de datos, la función arroja el error.
 */
export const getUserProject = async (userId, projectId, client) => {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .eq("id", projectId);
  if (error || data.length === 0) {
    throw error;
  }
  return data;
};

/**
 * Esta función recupera datos del proyecto de una base de datos utilizando un ID y un cliente
 * especificados.
 * @param id - El ID del proyecto que queremos recuperar de la base de datos.
 * @param client - El parámetro `cliente` es probablemente una instancia del cliente `supabase`, que se
 * utiliza para interactuar con una base de datos Supabase. Le permite realizar varias operaciones de
 * base de datos, como consultar, insertar, actualizar y eliminar datos.
 * @returns La función `getProject` devuelve los datos de un proyecto con un `id` específico de una
 * tabla de base de datos llamada "proyectos". Los datos se recuperan mediante el método `select` de un
 * objeto `cliente`, que se supone que es una instancia de una biblioteca de cliente de base de datos.
 * Si hay un error durante el proceso de recuperación de datos, el error se registra en la consola. La
 * función devuelve el
 */
export const getProject = async (id, client) => {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * Esta función recupera el nombre de un proyecto de una base de datos usando su ID.
 * @param id - El ID del proyecto del que queremos recuperar el nombre.
 * @param client - Es un objeto que representa la conexión a la base de datos. Se utiliza para ejecutar
 * consultas e interactuar con la base de datos.
 * @returns La función `getProjectName` devuelve el nombre del proyecto con el `id` especificado de la
 * tabla `projects` usando el objeto `cliente`. El nombre se devuelve como una Promesa que se resuelve
 * en una matriz de objetos que contienen la propiedad `nombre`. Si hay un error, se registrará en la
 * consola.
 */
export const getProjectName = async (id, client) => {
  const { data, error } = await client
    .from("projects")
    .select("name")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * Esta función recupera la descripción de un proyecto con una ID dada usando un objeto de cliente.
 * @param id - El ID del proyecto para el que queremos recuperar la descripción.
 * @param client - El parámetro `cliente` es probablemente una instancia del cliente `supabase`, que se
 * utiliza para interactuar con una base de datos Supabase. Le permite realizar varias operaciones de
 * base de datos, como consultar, insertar, actualizar y eliminar datos.
 * @returns La función 'getProjectDescription' devuelve el campo 'descripción' de un proyecto con el
 * 'id' especificado de la tabla 'proyectos' usando el objeto 'cliente'. Devuelve una promesa que se
 * resuelve en el objeto `datos` que contiene el valor del campo `descripción`, o un objeto de error si
 * hubo un error durante la consulta.
 */
export const getProjectDescription = async (id, client) => {
  const { data, error } = await client
    .from("projects")
    .select("description")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};

/**
 * Esta función recupera la fecha de creación de un proyecto con una ID dada usando un objeto de
 * cliente.
 * @param id - El parámetro id es el identificador único del proyecto para el que queremos recuperar la
 * fecha de creación.
 * @param client - El parámetro `cliente` es probablemente una instancia del cliente `supabase`, que se
 * utiliza para interactuar con una base de datos Supabase. Le permite realizar varias operaciones de
 * base de datos, como consultar, insertar, actualizar y eliminar datos.
 * @returns La función `getProjectCreationDate` está devolviendo el valor `created_at` de un proyecto
 * con el `id` dado de la tabla `projects` usando el objeto `cliente`. La función devuelve una Promesa
 * que se resuelve en un objeto con una propiedad `data` que contiene el valor `created_at`, o una
 * propiedad `error` si hubo un error al recuperar los datos.
 */
export const getProjectCreationDate = async (id, client) => {
  const { data, error } = await client
    .from("projects")
    .select("created_at")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data;
};
