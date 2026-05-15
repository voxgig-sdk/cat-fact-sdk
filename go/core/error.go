package core

type CatFactError struct {
	IsCatFactError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCatFactError(code string, msg string, ctx *Context) *CatFactError {
	return &CatFactError{
		IsCatFactError: true,
		Sdk:              "CatFact",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *CatFactError) Error() string {
	return e.Msg
}
