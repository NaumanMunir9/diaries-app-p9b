// libraries
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { Route, Switch } from "react-router-dom";

// rootReducer & redux store
import { RootState } from "../../rootReducer";
import { useAppDispatch } from "../../store";

// services
import http from "../../services/api";

// interfaces
import { Diary } from "../../interfaces/dairy.interface";
import { User } from "../../interfaces/user.interface";

// features
import { addDiary } from "./dairiesSlice";
import { setUser } from "../auth/userSlice";
import DiaryTile from "./DiaryTile";
import DiaryEntriesList from "./DiaryEntriesList";

const Diaries: FC = () => {
  const dispatch = useAppDispatch();
  const diaries = useSelector((state: RootState) => state.diaries);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
          if (data && data.length > 0) {
            const sortedByUpdatedAt = data.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(addDiary(sortedByUpdatedAt));
          }
        });
      }
    };

    fetchDiaries();
  }, [dispatch, user]);

  const createDiary = async () => {
    const result = (await Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2"],
    }).queue([
      {
        titleText: "Diary title",
        input: "text",
      },
      {
        titleText: "Private or public diary?",
        input: "radio",
        inputOptions: {
          private: "Private",
          public: "Public",
        },
        inputValue: "private",
      },
    ])) as any;

    if (result.value) {
      const { value } = result;
      const { diary, user: _user } = await http.post<
        Partial<Diary>,
        { diary: Diary; user: User }
      >("/diaries/", {
        title: value[0],
        type: value[1],
        userId: user?.id,
      });

      if (diary && user) {
        dispatch(addDiary([diary] as Diary[]));
        dispatch(addDiary([diary] as Diary[]));
        dispatch(setUser(_user));

        return Swal.fire({
          titleText: "All done!",
          confirmButtonText: "OK!",
        });
      }
    }

    Swal.fire({
      titleText: "Cancelled",
    });
  };

  return (
    <div style={{ padding: "1em 0.4em" }}>
      <Switch>
        <Route path="/diary/:id">
          <DiaryEntriesList />
        </Route>

        <Route path="/">
          <button onClick={createDiary}>Create New</button>
          {diaries.map((diary, idx) => (
            <DiaryTile key={idx} diary={diary} />
          ))}
        </Route>
      </Switch>
    </div>
  );
};

export default Diaries;
