// libraries
import { FC, useState } from "react";
import { Link } from "react-router-dom";

// redux store
import { useAppDispatch } from "../../store";

// features
import { updateDiary } from "./dairiesSlice";
import {
  setCanEdit,
  setActiveDiaryId,
  setCurrentlyEditing,
} from "../entry/editorSlice";

// services
import http from "../../services/api";

// util
import { showAlert } from "../../util";

// interfaces
import { Diary } from "../../interfaces/dairy.interface";

interface Props {
  diary: Diary;
}

const buttonStyle: React.CSSProperties = {
  fontSize: "0.7em",
  margin: "0 0.5em",
};

const DiaryTile: FC<Props> = (props) => {
  const [diary, setDiary] = useState(props.diary);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useAppDispatch();

  const totalEntries = props.diary.entryIds?.length;

  const saveChanges = () => {
    http
      .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
      .then((diary) => {
        if (diary) {
          dispatch(updateDiary(diary));
          showAlert("Saved!", "success");
        }
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <div className="diary-title">
      <h2
        className="title"
        title="Click to edit"
        onClick={() => setIsEditing(true)}
        style={{ cursor: "pointer" }}
      >
        {isEditing ? (
          <input
            type="text"
            value={diary.title}
            onChange={(e) => {
              setDiary({
                ...diary,
                title: e.target.value,
              });
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                saveChanges();
              }
            }}
          />
        ) : (
          <span>{diary.title}</span>
        )}
      </h2>

      <p className="subtitle">{totalEntries ?? "0"} saved entries</p>

      <div style={{ display: "flex" }}>
        <button
          style={buttonStyle}
          onClick={() => {
            dispatch(setCanEdit(true));
            dispatch(setActiveDiaryId(diary.id as string));
            dispatch(setCurrentlyEditing(null));
          }}
        >
          Add New Entry
        </button>

        <Link to={`diary/${diary.id}`} style={{ width: "100%" }}>
          <button className="secondary" style={buttonStyle}>
            View All &#8594;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DiaryTile;
