import React, { useState, useEffect } from "react";

export const Exercise2 = () => {
  // const initialState = {
  //   instruction: "Selecciona el resultado de la siguiente suma",
  //   problems: ["13,064", "66,318"],
  //   options: ["79,382", "53,459", "12,193", "96,408"],
  //   result: 0
  // };
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState(null);
  const CheckResult = idx => {
    if (idx === exercise.result) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const ChangeProblem = () => {
    let firstNumber = Math.floor(Math.random() * 100001);
    let secondNumber = Math.floor(Math.random() * 100001);
    let answer = firstNumber + secondNumber;

    let result = Math.floor(Math.random() * 4);

    let options = new Array(4);
    for (let i = 0; i < options.length; i++) {
      if (i === result) {
        options[i] = answer.toLocaleString("en-US");
      } else {
        let randomNumber = Math.floor(Math.random() * 200001);
        options[i] = randomNumber.toLocaleString("en-US");
      }
    }
    let problems = [
      firstNumber.toLocaleString("en-US"),
      secondNumber.toLocaleString("en-US")
    ];
    setExercise({
      instruction: "Selecciona el resultado de la siguiente suma",
      problems: problems,
      options: options,
      result: result
    });
    setLoading(false);
    setIsCorrect(null);
  };

  useEffect(() => {
    console.log(exercise);
  }, [exercise]);

  return (
    <div>
      {loading ? (
        <button className="problem-btn" onClick={ChangeProblem}>
          Generar problema
        </button>
      ) : (
        <>
          <h1>{exercise.instruction}</h1>
          <div className="problem-container">
            <div className="problem">
              <div className="sums">
                <p>&nbsp;&nbsp;{exercise.problems[0]}</p>
                <p>+{exercise.problems[1]}</p>
              </div>
              <div>
                <ul className="options">
                  {exercise.options.map((option, idx) => (
                    <li
                      className="problem-btn"
                      key={idx}
                      onClick={() => {
                        CheckResult(idx);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {isCorrect === null ? null : isCorrect ? (
              <span className="correct">Respuesta correcta!</span>
            ) : (
              <span className="incorrect">Respuesta incorrecta!</span>
            )}
            <button className="problem-btn" onClick={ChangeProblem}>
              Generar nuevo problema
            </button>
          </div>
        </>
      )}
    </div>
  );
};
