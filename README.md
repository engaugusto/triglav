# Triglav

EN
> Create a responsive timeline using SVG

PT-BR
> Criar uma timeline responsiva utilizando SVG


#Example

EN
>Example of the component, receive a JSON and render a single Knit. You could click or call to alert a single dot

PT-BR
>Exemplo do componente, ele recebe um JSON e renderiza uma timeline unica. Voce pode exibir um alerta em um ponto especifico

![Alt Text]( https://raw.githubusercontent.com/engaugusto/tiglav/master/imgs/2.gif)

## Installation

Install package

```bash
$ npm install
$ npm start
```

## Usage

Say `It works!`

```js
let width = 300;
let height = 300;
let divId = "test";
let array = [
   [
      {
          "ordem": 1,
          "nome": "First",
          "id": "55"
      },
      {
          "ordem": 2,
          "nome": "Second",
          "id": "66"
      }
   ]
]
let opts = {
                dotColor: "#FFF",
                lineColor: "#FFF",
                blinkColor: '#F00'
            };
var m = new Triglav(divId,width,heigth,array, function(id){
                    console.log(id);
                    },
                    opts 
                );
```

## Development

- Cloning the repo

```bash
$ git clone https://github.com/engaugusto/Triglav.git
```

- Installing dependencies

```bash
$ npm install
```

- Running scripts

| Action                                   | Usage               |
| ---------------------------------------- | ------------------- |
| Starting development mode                | `npm start`         |

## Author

[Carlos Augusto](https://twitter.com/engaugusto)

## License

[MIT](https://github.com/engaugusto/Triglav/blob/master/LICENSE)

[license-url]: https://opensource.org/licenses/MIT
