import {
  render,
  screen,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test('should render a button with name "fetch todos"', async () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: /fetch todos/i }));

    expect(await screen.findByText(/loading/i)).toBeVisible();
  });

  test('should render "loading" when fetching the todos', async () => {
    render(<App />);

    userEvent.click(screen.getByText(/fetch todos/i));

    expect(await screen.findByText(/loading/i)).toBeVisible();
  });

  test("should render a list", async () => {
    render(<App />);

    userEvent.click(screen.getByText(/fetch todos/i));

    expect(await screen.findByRole("list")).toBeVisible();
  });

  test("should render list items", async () => {
    render(<App />);

    userEvent.click(screen.getByText(/fetch todos/i));

    const todos = await screen.findAllByRole("listitem");
    expect(todos.length).toEqual(200);
  });

  test("should render the todo titles", async () => {
    render(<App />);

    userEvent.click(screen.getByText(/fetch todos/i));

    const todos = await screen.findAllByRole("listitem");
    todos.forEach((todo) => expect(todo).toBeVisible());
    expect(await screen.findByText(/delectus aut autem/i)).toBeVisible();
  });
});

describe("when a todo is clicked", () => {
  test("should render the username and user email of the first todo", async () => {
    render(<App />);

    userEvent.click(screen.getByText(/fetch todos/i));
    userEvent.click(await screen.findByText(/delectus aut autem/i));

    expect(await screen.findByText(/leanne graham/i)).toBeVisible();
    expect(await screen.findByText(/sincere@april.biz/i)).toBeVisible();
  });

  test("should render the username and user email of the last todo", async () => {
    render(<App />);

    userEvent.click(screen.getByText(/fetch todos/i));
    userEvent.click(await screen.findByText(/ipsam aperiam voluptates qui/i));

    expect(await screen.findByText(/clementina dubuque/i)).toBeVisible();
    expect(await screen.findByText(/rey.padberg@karina.biz/i)).toBeVisible();
  });

  test("should render the react toastify toast", async () => {
    const { container } = render(<App />);

    userEvent.click(screen.getByText(/fetch todos/i));
    userEvent.click(await screen.findByText(/delectus aut autem/i));

    expect(container.getElementsByClassName("Toastify")[0]).toBeInTheDocument();
  });
});

test("should remove the todo when a todo is double clicked", async () => {
  render(<App />);

  userEvent.click(screen.getByText(/fetch todos/i));
  userEvent.dblClick(await screen.findByText(/delectus aut autem/i));

  waitForElementToBeRemoved(() =>
    screen.queryByText(/delectus aut autem/i)
  ).then(() => {
    expect(screen.queryByText(/delectus aut autem/i)).not.toBeVisible();
    expect(screen.getAllByRole("listitem").length).toEqual(199);

    // Should not execute a single click
    expect(screen.queryByText(/leanne graham/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sincere@april.biz/i)).not.toBeInTheDocument();
  });
});
