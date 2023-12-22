import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define the Pokemon types
type PokemonType = {
  id: number
  name: string
  damageRelations: {
    doubleDamageFrom: string[]
    doubleDamageTo: string[]
    halfDamageFrom: string[]
    halfDamageTo: string[]
    noDamageFrom: string[]
    noDamageTo: string[]
  }
}

// Define the Pokemon abilities
type PokemonAbility = {
  id: number
  name: string
  effect: string
}

// Define the Pokemon moves
type PokemonMove = {
  id: number
  name: string
  power: number
  accuracy: number
}

// Define the Pokemon stats
type PokemonStat = {
  id: number
  name: string
  value: number
}

// Define the Pokemon object
type Pokemon = {
  id: number
  name: string
  types: PokemonType[]
  abilities: PokemonAbility[]
  moves: PokemonMove[]
  stats: PokemonStat[]
}

// Define the base URL for your API
const baseUrl = "https://pokeapi.co/api/v2"

// Create the API using RTK Query
export const pokemonApi = createApi({
  // reducerPath : the state that hold the api data  is used as the key in the Redux store ,
  // to select data from the store, you might do something like const data = useSelector((state) => state.pokemonApi).
  // fetchBaseQuery : A small wrapper around fetch
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // this will do in the background : async () => fetch("https://pokeapi.co/api/v2/pokemon/id").then((res) => res.json()),
    // you can add multiple arg like : ({id, name, ...}) => `pokemon/${id}/${name}`
    // query: This is used for GET requests, which are used to retrieve data from the server.
    // automatically cached, and multiple identical requests will be deduplicated to a single request.
    // Mutations are not cached or deduplicated, because they usually change data on the server and each request is important.
    createPokemon: builder.mutation<void, Partial<Pokemon>>({
      // `result` is the server response : Determines which cached data should be either re-fetched or removed from the cache
      invalidatesTags: [{ id: "LIST", type: "Pokemon" }],
      query: (newPokemon) => ({
        body: newPokemon,
        method: "POST",
        url: `pokemon`,
      }),
    }),
    // Also, RTK Query provides features like automatic re-fetching and polling for queries.
    getAllPokemon: builder.query<Pokemon[], number | void>({
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ id, type: "Pokemon" as const })),
              { id: "LIST", type: "Pokemon" },
            ]
          : [{ id: "LIST", type: "Pokemon" }],
      query: (limit = 10) => `pokemon?limit=${limit}`,
    }),
    getPokemon: builder.query<Pokemon, number>({
      // `result` is the server response ; Determines which 'tag' is attached to the cached data returned by the query
      providesTags: (result, error, id) => [{ id, type: "Pokemon" }],
      query: (id) => `pokemon/${id}`,
    }),
    // mutation: This is used for POST, PUT, PATCH, and DELETE requests, which are used to send data to the server.
    getPokemonType: builder.query<PokemonType, number>({
      // `result` is the server response : Determines which 'tag' is attached to the cached data returned by the query
      providesTags: (result, error, id) => [{ id, type: "PokemonType" }],
      query: (id) => `type/${id}`,
    }),
    updatePokemon: builder.mutation<void, Partial<Pokemon>>({
      // `result` is the server response : Determines which cached data should be either re-fetched or removed from the cache
      invalidatesTags: (result, error, pokemon) => [
        { id: pokemon.id, type: "Pokemon" },
      ],
      query: (pokemon) => ({
        body: pokemon,
        method: "PATCH",
        url: `pokemon/${pokemon.id}`,
      }),
    }),
    // and so on (if you fetch from the same server -baseUrl-)
  }),
  // defaults to 'api'
  reducerPath: "pokemonApi",
  tagTypes: ["Pokemon", "PokemonType"],
})

// Export the generated hooks for easy usage
export const {
  useCreatePokemonMutation,
  useGetPokemonQuery,
  useGetPokemonTypeQuery,
} = pokemonApi
// This is a hook that RTK Query generates based on the getPokemon endpoint you defined in your API service.
//* You can use this hook query in your components to fetch data from the getPokemon endpoint.
/*
import { useGetPokemonQuery } from "./path/to/your/api/file"

function PokemonComponent({ id }: { id: number }) {
  const result = useGetPokemonQuery(id)

  let content: JSX.Element | null = null

  if (result.isLoading) {
    content = <Spinner text="Loading..." />
  } else if (result.isSuccess) {
    // TypeScript now knows that `result.data` is valid here
    content = <div>{result.data?.name}</div>
  } else if (result.isError) {
    content = <div>{result.error?.toString()}</div>
  }

  return <>{content}</>
}
*/

//* the use of hook mutation

/* import {
  useCreatePokemonMutation,
  useUpdatePokemonMutation,
} from "./PokemonAPI"

function PokemonForm({ initialPokemon }) {
  const [createPokemon, { isLoading: isCreating }] = useCreatePokemonMutation()
  const [updatePokemon, { isLoading: isUpdating }] = useUpdatePokemonMutation()

  const [pokemon, setPokemon] = useState(initialPokemon || {})

  const handleChange = (event) => {
    setPokemon({
      ...pokemon,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (pokemon.id) {
      await updatePokemon(pokemon)
    } else {
      await createPokemon(pokemon)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={isCreating || isUpdating}>
        {pokemon.id ? "Update Pokemon" : "Create Pokemon"}
      </button>
    </form>
  )
} */

//* explain tags :
/* The providesTags and invalidatesTags options in RTK Query are not added automatically
  because they require knowledge about the specific relationships between your API endpoints, which the library cannot infer on its own.
  For example, if you have a getPokemon query and an updatePokemon mutation,
  you might want to invalidate the getPokemon query whenever the updatePokemon mutation is called,
  to ensure that your app always has the latest data.
  However, RTK Query has no way of knowing that these two endpoints are related unless you tell it by using providesTags and invalidatesTags.
 */
