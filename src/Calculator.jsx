import React, { useState } from 'react';
import styles from './Calculator.module.css';

const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, ''];
const OPERATORS = ['C', '+', '-', '='];

const Calculator = () => {
	const [display, setDisplay] = useState('0'); // Состояние дисплея
	const [operand1, setOperand1] = useState(''); // Первый операнд
	const [operand2, setOperand2] = useState(''); // Второй операнд
	const [operator, setOperator] = useState(null); // Текущая операция
	const [firstOperand, setFirstOperand] = useState(true); // Первый ли операнд

	const handleClick = (value) => {
		if (value === 'C') {
			// Сброс
			setDisplay('0');
			setOperand1('');
			setOperand2('');
			setOperator(null);
			setFirstOperand(true);
		}
		if (value === '=') {
			setDisplay(calculate(Number(operand1), Number(operand2), operator));
			setOperand1('');
			setOperand2('');
			setOperator(null);
			setFirstOperand(true);
		} else if (OPERATORS.includes(value) && operand1 !== '') {
			// (+, -)
			if (firstOperand) {
				setOperator(value);
				setDisplay(String(operand1) + String(value));
				setFirstOperand(false);
			} else {
				//Нажатие операции +/- повторное, результат предыдущей операции в первый операнд
				setOperator(value);
				setDisplay(calculate(Number(operand1), Number(operand2), operator));
				setOperand1(calculate(Number(operand1), Number(operand2), operator));
				setOperand2('');
			}
		} else if (NUMS.includes(value)) {
			if (firstOperand) {
				setOperand1(String(operand1) + String(value));
				setDisplay(String(operand1) + String(value));
			} else {
				setOperand2(String(operand2) + String(value));
				setDisplay(String(operand1) + operator + (operand2 + String(value)));
			}
		}
	};

	const calculate = (a, b, op) => {
		switch (op) {
			case '+':
				return a + b;
			case '-':
				return a - b;
			default:
				return b;
		}
	};

	return (
		<div className={styles.calculator}>
			<input type="text" className={styles.display} value={display} readOnly />

			<div className={styles.buttons}>
				<div className={styles.numbers}>
					{NUMS.map((num, index) => (
						<button
							key={index}
							className={num === '' ? styles['empty-cell'] : styles.button}
							onClick={() => handleClick(num)}
						>
							{num}
						</button>
					))}
				</div>
				<div className={styles.operations}>
					{OPERATORS.map((key, index) => (
						<button
							key={index}
							className={`${styles.button} ${
								styles[key === '=' ? 'equals' : 'operator']
							}`}
							onClick={() => handleClick(key)}
						>
							{key}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default Calculator;
