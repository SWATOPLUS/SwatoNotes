import { Injectable } from "@angular/core";
import { Note } from "src/app/features/records/records/records.component";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    public notes: Note =
      {
        title: "Мой блокнот",
        date: "",
        time: "",
        children: [
          {
            type: "root",
            title: "Заметки",
            date: "",
            time: "",
            children: []
          },
          {
            type: "folder",
            title: "Тачки",
            date: "",
            time: "",
            children: []
          },
          {
            type: "folder",
            title: "Свиданки",
            date: "",
            time: "",
            children: []
          },
          {
            type: "inbox",
            title: "Входящие",
            date: "",
            time: "",
            children: []
          },
        ]
      }

    getLocalStorage(item: string) {
        const data = localStorage.getItem(item);
        if (data != null) {
          return JSON.parse(data)
        } else if (item === 'notes') {
            return this.notes
        } else {
            return {}
        }
      }
    
    updateLocalStorage(mainNote: Note, item: string) {
        localStorage.removeItem(item);
        localStorage.setItem(item, JSON.stringify(mainNote));
      }
}
