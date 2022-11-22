import { useEffect, useRef, useState } from "react";
import "App.scss";
import List from "components/List";
import Loading from "components/Loading";
import Form from "components/Form";
import { Sub, SubsResponseFromApi } from "types";
import axios from "axios";

interface AppState {
  subs: Array<Sub>;
  loading: boolean;
}

const App = () => {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [loading, setLoading] = useState<AppState["loading"]>(true);
  const divRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   let interval: any;
  //   try {
  //     fetch("http://localhost:3500/subs")
  //       .then((data) => data.json())
  //       .then((data) => {
  //         setSubs(data);
  //         interval = setTimeout(() => {
  //           setLoading(false);
  //         }, 1000);
  //       });
  //   } catch (err) {
  //     console.table("there was a problem");
  //   }
  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, []);
  useEffect(() => {
    let interval: any;
    try {
      // const fetchSubs = (): Promise<SubsResponseFromApi> => {
      //   return fetch("http://localhost:3500/subs").then(
      //     (data) => data.json() as Promise<SubsResponseFromApi>
      //   );
      // };
      const fetchSubs = async ()=> {
        const response = await axios.get<SubsResponseFromApi>("http://localhost:3500/subs");
        return response.data;
      };

      const mapFromApiToSubs = (
        apiResponse: SubsResponseFromApi
      ): Array<Sub> => {
        return apiResponse.map((subs) => {
          const { id, nick, subMonths, avatar, desc } = subs;

          return {
            id,
            nick,
            subMonths,
            avatar,
            desc,
          };
        });
      };

      fetchSubs()
        .then(mapFromApiToSubs)
        .then((data) => {
          setSubs(data);
          interval = setTimeout(() => {
            setLoading(false);
          }, 1000);
        });
    } catch (err) {
      console.table("there was a problem");
    }
    return () => {
      clearTimeout(interval);
    };
  }, []);

  const handleNewSub = (newSub: Sub) => {
    setSubs((prev) => [
      ...prev,
      { ...newSub, id: Math.floor(Math.random() * 100) },
    ]);
  };

  return (
    <div className="App" ref={divRef}>
      <header className="App-header">
        <h1>Subscribers</h1>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Form onNewSub={handleNewSub} />

            <List subs={subs}>
              <small className="verified">
                <strong>Verified</strong>
              </small>
            </List>
          </>
        )}
      </header>
    </div>
  );
};

export default App;
