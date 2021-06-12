'use strict';
/**
 * Генерация игрового поля
 * @returns String
 */
const startFiguresLine = ['rook', 'knight', 'pawn', 'queen', 'king', 'pawn', 'knight', 'rook'];
const chessBoardGen = () => {
	const cells = () => {
		let output = '';
		let fraction = '';
		let type = '';
		for (let y = 8; y > 0; y--) {
			if (y >= 7) {
				fraction = 'black';
			} else if (y <= 2) {
				fraction = 'white';
			}
			for (let x = 1; x <= 8; x++) {
				if (y === 1 || y === 8) {
					type = startFiguresLine[x - 1];
				} else if (y === 2 || y === 7) {
					type = 'bishop'
				} else {
					type = '';
				}
				output += chessCellGen(x, y, figureInsertionOnGen(fraction, type));
			}
		}
		return output;
	}
	return `<section class="chessBoard">${cells()}</section>`;
}
/**
 * Генерация отдельной ячейки
 * @param xCord
 * @param yCord
 * @param figure
 * @returns String
 */
const chessCellGen = (xCord, yCord, figure = '') => {
	let color = '';
	if (yCord % 2 === 0) {
		color = xCord % 2 !== 0 ? 'white' : 'black';
	} else {
		color = xCord % 2 !== 0 ? 'black' : 'white';
	}
	return `<div class="chessCell ${color}" data-xCord="${xCord}" data-yCord="${yCord}">${figure}</div>`;
}
const figureInsertionOnGen = (fraction, type = "") => {
	const figures = {
		bishop: `<i class="fas fa-chess-bishop" data-fraction="${fraction}"></i>`,
		king: `<i class="fas fa-chess-king" data-fraction="${fraction}"></i>`,
		queen: `<i class="fas fa-chess-queen" data-fraction="${fraction}"></i>`,
		pawn: `<i class="fas fa-chess-pawn" data-fraction="${fraction}"></i>`,
		knight: `<i class="fas fa-chess-knight" data-fraction="${fraction}"></i>`,
		rook: `<i class="fas fa-chess-rook" data-fraction="${fraction}"></i>`,
	}
	return fraction ? figures[type] : '';
}
document.body.insertAdjacentHTML('afterbegin', chessBoardGen());