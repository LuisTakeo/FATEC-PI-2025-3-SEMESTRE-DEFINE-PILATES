  // useEffect(() => {
  //   async function fetchAulas() {
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/class`);
  //       const data: Aula[] = await response.json();
  //       setAulas(data);
  //     } catch (error) {
  //       console.error("Erro ao buscar aulas:", error);
  //     }
  //   }

import { API_BASE_URL } from "../../config/api";

  //   fetchAulas();
  // }, []);


  export async function fetchAulas(){

    try{
        const response = await fetch(`${API_BASE_URL}/aulas`) 
        const data = await response.json()
        console.log(data)
    }catch (err){
        console.error("Erro: ", err)
    }
  }