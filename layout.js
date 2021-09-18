let Main = $('main');

let Body = $('body');


let Windoww = $(window);

let WindowH = Windoww.height();

let WindowW = Windoww.width();


let OpçDeNivel = $('#SelecDif');


let ArwUp = $('#ArrowUp');

let ArwDw = $('#ArrowDown');

let ArwAnimationEnd = true;

let NivelAtual = 0;

let NivelAtualExt = 0;


let Tabuleiro = $('#Tabuleiro');

let NumDeCartas = [];

let NumDaCarta;


let ClassPos = [];


let NumsDasPos = [];

let NumDaPos;

let PosDoTab = [];


let ConjuntoDePos = [];

let PosFinais = '';


let QntdDeColunas = 3;


let BtnPlay = $('#BtnPlay');


let NumDaJogada =  0;

let CartasClickadas = [];

let CorAleatória;

let CoresAtuais = [];

let Opções = $('.OptsDif');


Windoww.resize(UpdateDis);


$(document).ready(UpdateDis(), OrganizarTabuleiro());

function UpdateDis()
{   
    Main.css("grid-row-gap", window.innerHeight*0.25).css("padding-top", window.innerHeight*0.13);


    Tabuleiro.css({top: '10%', left: (window.innerWidth/2 - Tabuleiro.outerWidth()/2) + 'px'});

    
    ArwUp.css({'position': 'absolute', 'left': OpçDeNivel.position().left + OpçDeNivel.outerWidth() + 20, 'top': (OpçDeNivel.position().top - 45) + 'px'});

    ArwDw.css({'position': 'absolute', 'left': OpçDeNivel.position().left + OpçDeNivel.outerWidth() + 20, 'top': (OpçDeNivel.position().top + OpçDeNivel.outerHeight() - ArwDw.outerHeight() + 45) + 'px'});

    OpçDeNivel.scrollTop(OpçDeNivel.scrollTop() + (Opções.eq(NivelAtual).position().top - OpçDeNivel.position().top));

    $('#Blur').css('height', (Tabuleiro.position().top + Tabuleiro.outerHeight()) + 'px');
}

ArwUp.click(() => {
    if(ArwAnimationEnd)
    {
        ArwAnimationEnd = false;
        if(NivelAtual != 0)
        {
            ArwUp.addClass('ArrowPush');
        }
        else
        {
            ArwUp.find('path').css('fill', '#ff073d');
            ArwUp.css('transform', 'scale(110%)');
            setTimeout(()=>{ArwUp.find('path').css('fill', '#eb4577'); ArwUp.css('transform', '')}, 300)
        }


        if(NivelAtual != 0)
        {
            NivelAtual--
        };

        OpçDeNivel.animate({scrollTop: OpçDeNivel.scrollTop() + (Opções.eq(NivelAtual).position().top - OpçDeNivel.position().top)}, 400, 'swing', () => {
            ReiniciarTabuleiro();

            OrganizarTabuleiro();
            
            ArwUp.removeClass('ArrowPush')});

            ArwAnimationEnd = true;
    }
});

ArwDw.click(() => {
    if(ArwAnimationEnd)
    {
        ArwAnimationEnd = false;
        if(NivelAtual != 3)
        {
            ArwDw.addClass('ArrowPush');
        }
        else
        {
            ArwDw.find('path').css('fill', '#ff073d');
            ArwDw.css('transform', 'scale(110%)');
            setTimeout(()=>{ArwDw.find('path').css('fill', '#eb4577'); ArwDw.css('transform', '');}, 300);
        }

        if(NivelAtual != 3)
        {
            NivelAtual++
        };


        OpçDeNivel.animate({scrollTop: OpçDeNivel.scrollTop() + (Opções.eq(NivelAtual).position().top - OpçDeNivel.position().top)}, 400, 'swing', () => {
            ReiniciarTabuleiro();

            OrganizarTabuleiro();

            ArwDw.removeClass('ArrowPush');

            ArwAnimationEnd = true;
        });
    }
});

function Repetido(Conjunto, Num, CheckLeng, Leng)
{
    for(let n = 0; n < Conjunto.length; n++)
    {
        if(Conjunto[n] == Num)
        {
            return true;
        }
    }
    if(CheckLeng == true)
    {
        console.log(Num.length + ' ' + Leng);
        return Num.length < Leng;
    }
    else
    {
        return false;
    }
}

function ReiniciarTabuleiro()
{
    NumDeCartas = [];


    Tabuleiro.empty();

    ClassPos = [];
    PosDoTab = [];

    NumsDasPos = [];

    ConjuntoDePos = [];
    PosFinais = '';
}

function OrganizarTabuleiro()
{
    switch(NivelAtual)
    {
        case 0:
            NivelAtualExt = 3;
            break;

        case 1:
            NivelAtualExt = 10;
            break;

        case 2:
            NivelAtualExt = 15;
            break;

        case 3:
            NivelAtualExt = 28;
            break;
    }

    if(NivelAtualExt < 5)
    {
        QntdDeColunas = NivelAtualExt;
    }
    else
    {
        QntdDeColunas = 5;
    }

    for(let n = 0; n < NivelAtualExt; n++)
    {
        do
        {
            NumDaCarta = Math.floor(Math.random() * (29 - 1) + 1);
        } while(Repetido(NumDeCartas, NumDaCarta));
        NumDeCartas = NumDeCartas.concat(NumDaCarta);
    }

    for(let n = 0; n < NumDeCartas.length; n++)
    {
        Tabuleiro.append('<div class="Cards"> <img class="CardsBack" src="Assets/Capa.jpg"> <img class="CardsFront" src="Assets/C' + NumDeCartas[n] + '.jpg"> </div>');
        Tabuleiro.append('<div class="Cards"> <img class="CardsBack" src="Assets/Capa.jpg"> <img class="CardsFront" src="Assets/C' + NumDeCartas[n] + '.jpg"> </div>');
    }



    for(let n = 0; n < NumDeCartas.length * 2; n++)
    {
        do
        {
            NumDaPos = Math.floor(Math.random() * ((NumDeCartas.length * 2) - 0) + 0);
        } while(Repetido(NumsDasPos, NumDaPos));
        NumsDasPos = NumsDasPos.concat(NumDaPos);
    }

    $('.Cards').each(function(In) {
        $(this).css('order', NumsDasPos[In]);
    });
    

    let Dimenções = {Min: '140px', Ideal: '20vw', Max: '300px'}
    
    Tabuleiro.children().each(function (){
        $(this).css('width', 'clamp( ' + Dimenções.Min + ', ' + Dimenções.Ideal + ', ' + Dimenções.Max + ')');
        $(this).css('height', 'clamp( ' + Dimenções.Min + ', ' + Dimenções.Ideal + ', ' + Dimenções.Max + ')');
    });

    console.log()

    $('.Cards').mouseover(function(){MouseOverCard(this)});

    $('.Cards').mouseout(function(){MouseOutCard(this)});


    $('.Cards').click(function(){ClickCard(this)});

    $('#Blur').css('height', (Tabuleiro.position().top + Tabuleiro.outerHeight()) + 'px');
}

BtnPlay.click(()=>{
    $('#Blur').css('backdrop-filter', 'blur(0px)');
    $('#Menu').css('filter', 'blur(10px)');
    setTimeout(()=>{
        $('#Blur').css('display', 'none');
        $('#Menu').css('display', 'none');
    }, 400);
});

function ClickCard(Eleme)
{
    $(Eleme).unbind('mouseout mouseover');

    $('.Cards').unbind('click');
    NumDaJogada++

    CartasClickadas = CartasClickadas.concat({src: $(Eleme).children('.CardsFront').attr('src'), elemento: $(Eleme)});

    if(NumDaJogada == 1)
    {
        do 
        {
            CorAleatória = Math.floor(Math.random()*16777215).toString(16);
        } while(Repetido(CoresAtuais, CorAleatória, true, 6));
        console.log(Repetido(CoresAtuais, CorAleatória, true, 6));
        CoresAtuais = CoresAtuais.concat(CorAleatória);
    }
    
    console.log(CorAleatória);
    $(Eleme).css({'transform': 'rotateY(180deg)', 'cursor': 'default', 'box-shadow': '#' + CorAleatória + ' 0px 0px 13px 9px'});

    
    if(NumDaJogada == 2)
    {
        if(CartasClickadas[0].src == CartasClickadas[1].src)
        {
            for(let n = 0; n < CartasClickadas.length; n++)
            {
                CartasClickadas[n].elemento.unbind().attr('Pareado', 'true');
                CartasClickadas[n].elemento.css({'cursor':'default'});
            }
            CartasClickadas = [];
            NumDaJogada = 0;
            let VerifyGame = 0;
            $('.Cards').each(function(){
                if($(this).attr('Pareado'))
                {
                    VerifyGame++;
                }
            });
            if(VerifyGame == NumDeCartas.length*2)
            {
                alert('Jogo Ganho.');
            }
            setTimeout(function(){$('.Cards').click(function(){ClickCard(this)})}, 650);
        }
        else
        {
            setTimeout(()=>{
                for(let n = 0; n < CartasClickadas.length; n++)
                {
                    
                        CartasClickadas[n].elemento.css({'transform': 'rotateY(0deg)', 'cursor': 'pointer', 'box-shadow': 'rgb(34, 34, 36) -8px 8px 13px 4px'});
                        CartasClickadas[n].elemento.bind('mouseout', function(){MouseOutCard(this)}).bind('mouseover', function(){MouseOverCard(this)});
                }
                CartasClickadas = [];
                NumDaJogada = 0;
                setTimeout(function(){$('.Cards').click(function(){ClickCard(this)})}, 650);
            }, 1250);
        }
    }
    else
    {
        setTimeout(function(){$('.Cards').click(function(){ClickCard(this)})}, 650);
    }
}

function MouseOutCard(Eleme)
{
    $(Eleme).css({'transform':'scale(1)', 'box-shadow':'rgb(34, 34, 36) -8px 8px 13px 4px'});
}

function MouseOverCard(Eleme)
{
    $(Eleme).css({'transform':'scale(1.1)', 'box-shadow':'rgb(34, 34, 36) -12px 12px 18px 6px'});
}

