import { displayAuthor, filterByAuthor } from "./utils/authorFilter";
import { displayDate, filterByDate } from "./utils/dateFilter";
import { displaySubject, filterBySubject } from "./utils/subjectFilter";

interface booksInterface {
  BookID: number;
  image: string;
  Title: string;
  Author: string;
  Subject: string;
  Year: string;
}
declare global {
  var data: { books: booksInterface[] };
}

class Main {
  static bookList: booksInterface[] = globalThis.data.books;
  static tableField = document.querySelector("#tableField") as HTMLDivElement;
  static filterButton = document.querySelector(
    "#filter-btn"
  ) as HTMLButtonElement;

  private currentBooks: booksInterface[];
  private count: number;
  private maxPages: number;

  constructor() {
    this.currentBooks = Main.bookList;
    this.count = 0;
    this.maxPages = 0;

    this.display(this.currentBooks);
    this.navigationButtonHandler();

    Main.filterButton.addEventListener("click", () => this.filterData());
  }

  display(books: booksInterface[]) {
    Main.tableField.innerHTML = "";
    this.maxPages = Math.ceil(books.length / 10) - 1;

    if (books.length == 0) {
      const h2 = document.createElement("h2");
      h2.innerText = "No books found";
      Main.tableField.appendChild(h2);
    }

    this.displayFieldData(books);
  }

  displayFieldData = (books: booksInterface[]) => {
    const prevButton = document.querySelector("#prev")! as HTMLButtonElement;
    const nextButton = document.querySelector("#next")! as HTMLButtonElement;
    let n =
      (this.count + 1) * 10 < books.length
        ? (this.count + 1) * 10
        : books.length;

    for (let i = this.count * 10; i < n; i++) {
      const div = document.createElement("div");
      div.setAttribute("class", "book-content");
      let contentImage = document.createElement("Img") as HTMLImageElement;

      const objectKeys = Object.keys(books[i]) as (keyof (typeof books)[0])[];
      contentImage.src = books[i][objectKeys[1]] as string;
      contentImage.style.maxWidth = "300px";
      contentImage.style.maxHeight = "400px";
      div.appendChild(contentImage);

      for (let j = 2; j < 6; j++) {
        let contentDiv = document.createElement("span");
        contentDiv.innerText = books[i][objectKeys[j]] as string;
        div.appendChild(contentDiv);
      }
      Main.tableField.appendChild(div);

      if (this.count === 0) prevButton.disabled = true;
      else prevButton.disabled = false;

      if (this.count === this.maxPages || this.maxPages < 0)
        nextButton.disabled = true;
      else nextButton.disabled = false;
    }
  };

  filterData = () => {
    const books = Main.bookList;
    const filter = document.querySelector(
      "#filter-dialog"
    )! as HTMLDialogElement;
    filter.showModal();

    const getAuthorNames = new Set(books.map((book) => book.Author));
    displayAuthor(getAuthorNames);

    const getSubjectNames = new Set(books.map((book) => book.Subject));
    displaySubject(getSubjectNames);

    displayDate();

    document
      .querySelector("#filter-done-btn")
      ?.addEventListener("click", () => this.filterDataHandler());
  };

  filterDataHandler() {
    const books = Main.bookList;
    const filter = document.querySelector(
      "#filter-dialog"
    )! as HTMLDialogElement;

    const [authorCount, filterdData0] = filterByAuthor(books);
    const [subjectCount, filterdData1] = filterBySubject(filterdData0, books);
    const [dateCount, filterdData] = filterByDate(filterdData1, books);

    this.count = 0;
    if (
      (authorCount > 0 || subjectCount > 0 || dateCount > 0) &&
      filterdData.length == 0
    ) {
      this.currentBooks = [];
      filter.close();
      this.display([]);
    } else if (filterdData.length === 0) {
      this.currentBooks = books;
      this.display(this.currentBooks);
      filter.close();
    } else {
      this.currentBooks = filterdData;
      this.display(this.currentBooks);
      filter.close();
    }
  }

  navigationButtonHandler() {
    const prevButton = document.querySelector("#prev")! as HTMLButtonElement;
    const nextButton = document.querySelector("#next")! as HTMLButtonElement;

    prevButton.addEventListener("click", () => {
      this.count--;
      console.log(this.count);
      this.display(this.currentBooks);
    });

    nextButton.addEventListener("click", () => {
      this.count++;
      console.log(this.count);
      this.display(this.currentBooks);
    });
  }
}

new Main();
