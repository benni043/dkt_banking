export type SpecialPropertyType = "line" | "company";

export type SpecialProperty = {
	id: number;
	ownerId: number | null;
	type: SpecialPropertyType;
	name: string;
};

export type PropertyColor =
	| "dark_blue"
	| "light_blue"
	| "dark_yellow"
	| "light_yellow"
	| "pink"
	| "red"
	| "orange"
	| "green";

export type Property = {
	id: number;
	ownerId: number | null;
	color: PropertyColor;
	state: string;
	street: string;
	rent: number;
	rent1House: number;
	rent2Houses: number;
	rent3Houses: number;
	rent4Houses: number;
	rent1Hotel: number;
	purchasePrice: number;
	housePrice: number;
	hotelPrice: number;
};

export type ActivityFieldType = "bank" | "risk";

export type ActivityField = {
	id: number;
	type: ActivityFieldType;
	text: string;
	amount: number;
};

export type Player = {
	uuid: string;
	color: string;
	money: number;
	hasEscapePrisonCard: boolean;
};

export type Game = {
	uuid: string;
	players: Player[];
	currentPlayerId: number;

	availableHouses: number;
	availableHotels: number;

	// playerTrade: {
	//   tradePlayerId: number;
	//   tradeActionCurrentPlayer: {
	//     propertyIds: number[];
	//     specialPropertyIds: number[];
	//     money: number;
	//   };
	//   tradeActionTradePlayer: {
	//     propertyIds: number[];
	//     specialPropertyIds: number[];
	//     money: number;
	//   };
	// } | null;

	cards: {
		properties: Property[];
		specialProperties: SpecialProperty[];
		activityFields: ActivityField[];
	};
};
