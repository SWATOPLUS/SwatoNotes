import { Injectable } from "@angular/core";
import { Note } from "src/app/features/records/records/records.component";

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    public notes!: Note;

    getLocalStorage(item: string) {
        const data = localStorage.getItem(item);
        if (data != null) {
          return JSON.parse(data)
        } else if (item === 'notes') {
            return {
              title: "Мой блокнот",
              date: "",
              time: "",
              children: [
                {
                  type: "inbox",
                  title: "Входящие",
                  date: "",
                  time: "",
                  children: []
                },
                {
                  type: "knowledge",
                  title: "Знание",
                  date: "",
                  time: "",
                  children: []
                },
                {
                  type: "task",
                  title: "Задача",
                  date: "",
                  time: "",
                  children: []
                },
              ]
            } 
        } else {
            return {}
        }
      }
    
    updateLocalStorage(mainNote: Note, item: string) {
        localStorage.removeItem(item);
        localStorage.setItem(item, JSON.stringify(mainNote));
      }
}
