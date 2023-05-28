import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import "./App.css";

function App() {
  const [pilesInputValue, setPilesInputValue] = useState("");
  const [hValue, setHValue] = useState("");
  const [pilesArray, setPilesArray] = useState([] as any[]);
  const [result, setResult] = useState();

  return (
    <div className="flex flex-col items-center justify-center gap-4 my-4">
      <Card className="w-full max-w-[24rem]">
        <CardHeader
          color="cyan"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
        >
          <Typography variant="h4" color="white">
            Задание параметров Коко
          </Typography>
        </CardHeader>
        <CardBody>
          <form>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Сколько кусочков вы хотите задать
            </Typography>
            <Input
              id="inputPiles"
              label="Количество кусочков"
              value={pilesInputValue}
              onChange={(e) => {
                setPilesInputValue(e.target.value);
                const pilesArray = new Array(+e.target.value).fill(0);
                setPilesArray(pilesArray);
              }}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-4 font-medium"
            >
              Сколько часов вы хотите задать
            </Typography>
            <Input
              id="inputH"
              label="Количество часов"
              value={hValue}
              onChange={(e) => setHValue(e.target.value)}
            />
          </form>
        </CardBody>
      </Card>
      <Typography variant="h5">
        Количество кусочков = {pilesInputValue}, Часов = {hValue}
      </Typography>
      <Typography variant="h5">Изменение кусочков</Typography>
      {!!pilesArray.length && (
        <div
          className="grid grid-cols-7 justify-center gap-4 max-w-[80%]"
          id="piles-list"
        >
          {pilesArray.map((pile, index) => (
            <Card className="shadow-none border-2">
              <CardBody className="p-2 flex flex-col items-center gap-2">
                <Typography variant="h4">{pile}</Typography>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      pilesArray[index]++;
                      setPilesArray([...pilesArray]);
                    }}
                    color="green"
                  >
                    +
                  </Button>
                  <Button
                    onClick={() => {
                      if (pilesArray[index] > 0) {
                        pilesArray[index]--;
                      }
                      setPilesArray([...pilesArray]);
                    }}
                    color="red"
                  >
                    -
                  </Button>
                </div>
                <input
                  id="inputPileValue"
                  className="max-w-full border border-gray-400 outline-blue-500 rounded-md px-2 py-1 my-1"
                  placeholder="Изменить"
                  onChange={(e) => {
                    pilesArray[index] = e.target.value;
                    setPilesArray([...pilesArray]);
                  }}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      <Button
        id="calc-button"
        color="blue"
        size="lg"
        onClick={async () => {
          const response = await fetch("http://151.248.126.8:6868", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              piles: pilesArray.join(" "),
              h: hValue,
            }),
          });

          const content = await response.json();
          setResult(content.result);
        }}
      >
        Посчитать
      </Button>
      {result && result > 0 ? (
        <p id="result">Коко потребуется {result} кусочков</p>
      ) : null}
    </div>
  );
}

export default App;
