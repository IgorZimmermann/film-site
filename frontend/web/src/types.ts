export interface validationError {
	property: string
	constraints: {
		[key: string]: string
	}
}
