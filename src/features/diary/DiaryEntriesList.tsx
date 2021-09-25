// libraries
import { FC, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

// redux
import { RootState } from "../../rootReducer";
import { useAppDispatch } from "../../store";

// features
import { setCurrentlyEditing, setCanEdit } from "../entry/editorSlice";
import { setEntries } from "../entry/entriesSlice";

// services
import http from "../../services/api";

// interfaces
import { Entry } from "../../interfaces/entry.interface";

const DiaryEntriesList: FC = () => {
  const { entries } = useSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const { id } = useParams<any>();

  useEffect(() => {
    if (id != null) {
      http
        .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
        .then(({ entries: _entries }) => {
          if (_entries) {
            const sortByLastUpdated = _entries.sort((a, b) => {
              return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
            });
            dispatch(setEntries(sortByLastUpdated));
          }
        });
    }
  }, [id, dispatch]);

  return (
    <div className="entries">
      <header>
        <Link to="/">
          <h3>&larr; Go Back</h3>
        </Link>
      </header>

      <ul>
        {entries.map((entry) => (
          <li
            key={entry.id}
            onClick={() => {
              dispatch(setCurrentlyEditing(entry));
              dispatch(setCanEdit(true));
            }}
          >
            {entry.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaryEntriesList;
