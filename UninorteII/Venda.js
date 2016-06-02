// Inicialização do jQuery e Parse

$tc = jQuery.noConflict();
Parse.initialize("LLvYkhxXDXnavbW7jXelKEEH81Prar9vS4jIvxz9", "NYW22Qo4v4M776SMsaiZKUJWNHKwsVHvI1fBEqv7");

// variaveis
	var listaVendedoras = [{
		"nome": "TCT EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A - JD. TREVISO",
		"cnpj": "11.788.574/0001-92"
	},
	{
		"nome": "TCT EMPREENDIMENTOS IMOBILIÁRIOS SPE S.A - JD. MILANO",
		"cnpj": "14.570.528/0001-00"
	},
	{
		"nome": "TCMEP EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA",
		"cnpj": "10.320.670/0001-49"
	},
	{
		"nome": "UNINORTE II EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA",
		"cnpj": "14.570.461/0001-04"
	},
	{
		"nome": "TCB EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA",
		"cnpj": "10.501.265/0001-27"
	},
	{
		"nome": "TERRAZUL KR SPE LTDA",
		"cnpj": "04.701.263/0001-89"
	}
	];

	var listaEmpreendimentos = [
		{
			"nome" : "JARDIM RESIDENCIAL UNIMEP"
		},
		{
			"nome" : "TERRAZUL KR"
		},
		{
			"nome" : "TERRAZUL SM"
		},
		{
			"nome" : "LOTEAMENTO INDUSTRIAL UNINORTE II"
		},
		{
			"nome" : "JARDIM TREVISO"
		},
		{
			"nome" : "LOTEAMENTO JARDIM MILANO"
		},
	];

	var pegaProp = parseInt($tc('#proponente').val());
	var campos = $tc('#vi_jdmilano_pf').serializeArray(); // AQUI É PARA PEGAR OS CAMPOS DO FORM

// document ready - jQuery

$tc(function(){

	if($tc('#executou1vez').val() == 'true') {
		$tc('.tc-ret-botoes').hide();
		$tc('.btn-addChild').hide();
	}

	if($tc('#proponente').val() == "") {
		$tc('#proponente').attr("value", 0);
		fcnBotao();
	}

	if(pegaProp > 0) {
		fcnMostrar();
	}

	$tc('.tc-btnAddProp').on('click', fcnBotao );

	$tc('.tc-btnCancelProp').on('click', fcnBotaoDeletar );

	// pagamento do sinal
	SelecionarPagamentoSinal($tc('#pagamentoSinal').val());

	$tc('#pagamentoSinal').change(function(){
		SelecionarPagamentoSinal($tc(this).val());
	});

	// indice de reajuste
	$tc('#indiceReajuste').change(function(){
		SelecionarIndiceReajuste($tc(this).val());
	});

	// chamar janela de lotes
	$tc('.btn_zoomExterno').on('click', function() {
    mostraLista();
  });

  $tc('.valorParcela').on('blur', function() {
  	CalcularSaldo(this);
  	MostrarExtensoCampoPorClasse("valorParcela");
  });

	$tc.each(campos, function() {

		$tc('#' + this.name).on('change', function() {
			MostrarExtensoCampo(this.name);
		});

	});

	/*
	$tc('#btn_salvaPdf').on('click', function() {
		//e.preventDefault();
		var pdf = new jsPDF('p','pt','a4');
		//pdf.save('proposta_ecm.pdf');	
		pdf.addHTML(document.body,function() {
		  var string = pdf.output('datauristring');
			$tc('.preview-pane').attr('src', string);
			pdf.save('proposta.pdf');
		});
		pdf.save('test.pdf');
	});
	*/


	$tc('.btnBkpNuvem').on('click', function() {

		var Proposta = Parse.Object.extend("Proposta");
		var proposta = new Proposta();

		if ($tc('#proposta').val() == '' || $tc('#proposta').val() == '0') {

			$tc('.flash-nuvem').hide();
			$tc('.flash-nuvem').text("Preencha o nº da proposta !");
			$tc('.flash-nuvem').show();
			$tc('#proposta').focus();

			//$tc('#nome_1').val('MAURICIO REATTO DUARTE');

		} else {
			//console.log('proposta a ser salva agora');
			proposta.save(serializaForm('vi_jdmilano_pf'), {
	      success: function(formProposta) {
	      	/* AQUI EU PEGO O _id DO OBJETO */
	      	console.log(formProposta);
	      	console.log("O _id deste objeto é " + formProposta.id);
	        $tc('.flash-nuvem').hide();
					$tc('.flash-nuvem').text("Salvo com sucesso !");
					$tc('.flash-nuvem').show();
	      },
	      error: function(formProposta, error) {
	      	console.log(error);
	        $tc('.flash-nuvem').hide();
					$tc('.flash-nuvem').text(error.code);
					$tc('.flash-nuvem').show();
	      }
	    });
	  	
	  }

	});

	$tc('.btnRestauraDaNuvem').on('click', function() {

		var Proposta = Parse.Object.extend("Proposta");
		var query = new Parse.Query(Proposta);

		if ($tc('#proposta').val() == '' || $tc('#proposta').val() == '0') {

			$tc('.flash-nuvem').hide();
			$tc('.flash-nuvem').text("Preencha o nº da proposta !");
			$tc('.flash-nuvem').show();
			$tc('#proposta').focus();

		} else {

			query.equalTo("proposta", $tc('#proposta').val());
			query.first({
				success: function(object) {
					var campos = $tc('#vi_jdmilano_pf').serializeArray();

  				$tc.each(campos, function() {

  					$tc('#' + this.name).val(object.get(this.name)).change();

  				});

  				$tc('.flash-nuvem').hide();
					$tc('.flash-nuvem').text("Proposta de nº " + object.get('proposta') + " preenchida");
					$tc('.flash-nuvem').show();

				},
				error: function(error) {

					$tc('.flash-nuvem').hide();
					$tc('.flash-nuvem').text(error.code);
					$tc('.flash-nuvem').show();

				}
			});
	  	
	  }
	});

// Ao renderizar - load - jQuery
$tc(window).load(function(){

  if($tc('#pagamentoSinal').is('select')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').val().toLowerCase());
	}
	if($tc('#pagamentoSinal').is('span')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').text().toLowerCase());
	}

	if($tc('#vendedora').is('input')){
		$tc('#vendedora').val('UNINORTE II EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA');
	}
	if($tc('#vendedora').is('span')){
		$tc('#vendedora').text('UNINORTE II EMPREENDIMENTOS IMOBILIÁRIOS SPE LTDA');
	}

	if($tc('#cnpjVendedora').is('input')){
		$tc('#cnpjVendedora').val('14.570.461/0001-04');
	}
	if($tc('#cnpjVendedora').is('span')){
		$tc('#cnpjVendedora').text('14.570.461/0001-04');
	}

	if($tc('#empreendimento').is('input')){
		$tc('#empreendimento').val('UNINORTE II LOTEAMENTO INDUSTRIAL');
	}
	if($tc('#empreendimento').is('span')){
		$tc('#empreendimento').text('UNINORTE II LOTEAMENTO INDUSTRIAL');
	}

	MostrarExtenso();

});

function fcnMostrar(){

	var proponente = parseInt($tc('#proponente').val());

	$tc('#proponente').attr("value", proponente);

	$tc('.tc-div-proponente').hide();
	$tc(".tc-div-proponente").each(function(index, element) {
			$tc(element).show();
			if( (index + 1) == proponente){
				return false;
			}
	});

}

function fcnBotao(){

	var proponente = parseInt($tc('#proponente').val()) + 1;

	if( parseInt($tc('#proponente').val()) < 4 ){

		$tc('#proponente').attr("value", proponente);

		$tc('.tc-div-proponente').hide();

		$tc(".tc-div-proponente").each(function(index, element) {
			$tc(element).show();
			if( (index + 1) == proponente){
				return false;
			}
		});

	}

	if( parseInt($tc('#proponente').val()) == 1){
		$tc('#btn_adicionaProp').prop('disabled', false);
		$tc('#btn_deletaProp').prop('disabled', true);
	}
	if( parseInt($tc('#proponente').val()) >= 4){
		$tc('#btn_adicionaProp').prop('disabled', true);
		$tc('#btn_deletaProp').prop('disabled', false);
	}
	if( parseInt($tc('#proponente').val()) > 1 && parseInt($tc('#proponente').val()) < 4 ){
		$tc('#btn_adicionaProp').prop('disabled', false);
		$tc('#btn_deletaProp').prop('disabled', false);
	}

}

function fcnBotaoDeletar(){

	var proponente = parseInt($tc('#proponente').val()) - 1;

	if( parseInt($tc('#proponente').val()) > 1 ){
		$tc('#proponente').attr("value", proponente);
		$tc('.tc-div-proponente').hide();
		$tc(".tc-div-proponente").each(function(index, element) {
			$tc(element).show();
			if( (index + 1) == proponente){
				return false;
			}
		});
	}

	if( parseInt($tc('#proponente').val()) <= 1){
		$tc('#btn_deletaProp').prop('disabled', true);
		$tc('#btn_adicionaProp').prop('disabled', false);
	}

	if( parseInt($tc('#proponente').val()) == 1){
		$tc('#btn_adicionaProp').prop('disabled', false);
		$tc('#btn_deletaProp').prop('disabled', true);
	}
	if( parseInt($tc('#proponente').val()) >= 4){
		$tc('#btn_adicionaProp').prop('disabled', true);
		$tc('#btn_deletaProp').prop('disabled', false);
	}
	if( parseInt($tc('#proponente').val()) > 1 && parseInt($tc('#proponente').val()) < 4 ){
		$tc('#btn_adicionaProp').prop('disabled', false);
		$tc('#btn_deletaProp').prop('disabled', false);
	}

}

function serializaForm(formId) {
  var fields = $tc('#'+formId).serializeArray();

  var listaDeCampos = {};

  $tc.each( fields, function() {

  	listaDeCampos[this.name] = this.value;

  });

  return listaDeCampos;
}

IniForm();


});

var imaxPS = 1; // qtde de registros de pagamento do sinal

//inicializacao do formulario
function IniForm() {


	if($tc('#data').is('input') && $tc('#data').val() == ''){
		// inicia campo Data com data de hoje
		IniciarData();
	}



	if($tc('#pagamentoSinal').is('select')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').val().toLowerCase());
	}
	if($tc('#pagamentoSinal').is('span')){
		SelecionarPagamentoSinal($tc('#pagamentoSinal').text().toLowerCase());
	}

	if($tc('#indiceReajuste').is('select')){
		SelecionarIndiceReajuste($tc('#indiceReajuste').val().toLowerCase());
	}
	if($tc('#indiceReajuste').is('span')){
		SelecionarIndiceReajuste($tc('#indiceReajuste').text().toLowerCase());
	}


    if ( document.getElementById("exe1Exp").value == "true" )
	    horas1Exp.style.visibility = "visible";
		else {
	    horas1Exp.style.visibility = "hidden";
			horas1Exp.style.position = "absolute";
		}

    if ( document.getElementById("exe2Exp").value == "true" )
	    horas2Exp.style.visibility = "visible";
	else {
	    horas2Exp.style.visibility = "hidden";
		horas2Exp.style.position = "absolute";
	}

    if ( document.getElementById("exeSinal").value == "true" )
	    horasSinal.style.visibility = "visible";
	else {
	    horasSinal.style.visibility = "hidden";
		horasSinal.style.position = "absolute";
	}

    // apenas primeira execu?o
  if (document.getElementById("executou1vez").value == "") {
        // cria uma linha de cheque para tabela de pagamento do sinal
        wdkAddChild("tabelaBoleto");
        wdkAddChild("tabelaCheque");
        wdkAddChild("tabelaFormaPagamento");
        wdkAddChild("tabelaOutros");


		divBoleto.style.position = "absolute";
		divOutros.style.position = "absolute";
		divCheque.style.position = "absolute";

	    // inicia com foco no campo numero da proposta
	    var campoInicial = document.getElementById("proposta");
	    if (campoInicial != null) {
			document.getElementById("proposta").value = 0;
	        campoInicial.focus();
	    }
	}
    document.getElementById("executou1vez").value = "true";
}

// utilizada para calculo do saldo

/*function CalcularSaldoPorValor(valor) {
	
	var soma = 0;

	for (var i = 1; i <= imaxPS; i++) {

		if( ($tc("#quantidadeParcelas" + intToString(i)) != null) && 
		if( ($tc("#valorParcela" + intToString(i)) != null) && 
		if( ($tc("#quantidadeParcelas" + intToString(i)).val() != "undefined") && 
		if( ($tc("#valorParcela" + intToString(i)).val() != "undefined") && 
		if( ($tc("#quantidadeParcelas" + intToString(i)).val() != "") && 
		if( ($tc("#valorParcela" + intToString(i)).val() != "") ) {

		}

		if ((		document.getElementById("quantidadeParcelas" + intToString(i)) 			!= null			) &&
    		(		document.getElementById("valorParcela" 		 + intToString(i)) 			!= null			) &&
			(typeof(document.getElementById("quantidadeParcelas" + intToString(i)).value) 	!= "undefined"	) &&
			(typeof(document.getElementById("valorParcela"       + intToString(i)).value) 	!= "undefined"	) &&
			(		document.getElementById("quantidadeParcelas" + intToString(i)).value 	!= ""			) &&
			(		document.getElementById("valorParcela"       + intToString(i)).value 	!= ""			)) {

			var qtdeParc = document.getElementById("quantidadeParcelas" + intToString(i)).value;
			var valorParc = document.getElementById("valorParcela" + intToString(i)).value.replace(".", "");
			valorParc = valorParc.replace(",", ".");
			soma = Number(soma) + (Number(qtdeParc) * Number(valorParc));
		}
    }
	document.getElementById("valorSaldo").value = FloatToMoeda(soma);
    var valorSinal = document.getElementById("valorSinal").value.replace(".", "");
    valorSinal = valorSinal.replace(",", ".");
    var valorIntImob = document.getElementById("valorIntermediacaoImob").value.replace(".", "");
    valorIntImob = valorIntImob.replace(",", ".");
	document.getElementById("valorTotal").value = FloatToMoeda( Number(valorSinal) + Number(valorIntImob) + Number(soma) );

	MostrarExtenso();
}*/

function CalcularSaldo(elemento) {

  var soma = 0;

	if (imaxPS < stringToInt(elemento.id))
		imaxPS = stringToInt(elemento.id);

    for (var i = 1; i <= imaxPS; i++) {

		if ((		document.getElementById("quantidadeParcelas" + intToString(i)) 			!= null			) &&
    		(		document.getElementById("valorParcela" 		 + intToString(i)) 			!= null			) &&
			(typeof(document.getElementById("quantidadeParcelas" + intToString(i)).value) 	!= "undefined"	) &&
			(typeof(document.getElementById("valorParcela"       + intToString(i)).value) 	!= "undefined"	) &&
			(		document.getElementById("quantidadeParcelas" + intToString(i)).value 	!= ""			) &&
			(		document.getElementById("valorParcela"       + intToString(i)).value 	!= ""			)) {

			var qtdeParc = document.getElementById("quantidadeParcelas" + intToString(i)).value;
			var valorParc = document.getElementById("valorParcela" + intToString(i)).value.replace(".", "");
			valorParc = valorParc.replace(",", ".");
			soma = Number(soma) + (Number(qtdeParc) * Number(valorParc));
		}
    }
	document.getElementById("valorSaldo").value = FloatToMoeda(soma);
    var valorSinal = document.getElementById("valorSinal").value.replace(".", "");
    valorSinal = valorSinal.replace(",", ".");
    var valorIntImob = document.getElementById("valorIntermediacaoImob").value.replace(".", "");
    valorIntImob = valorIntImob.replace(",", ".");
	document.getElementById("valorTotal").value = FloatToMoeda( Number(valorSinal) + Number(valorIntImob) + Number(soma) );

	MostrarExtenso();
}

function handleEnter (field, event) {

	var code = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (code == 13) {

		if ( !ValidarCampo(field, event) )
			return true;

		var i;
		for (i = 0; i < field.form.elements.length; i++)
			if (field == field.form.elements[i])
				break;

		i = (i + 1) % field.form.elements.length;
		field.form.elements[i].focus();
	}
	else
		return true;
}

function ValidarCampo(field, event)	{

	if (field.readOnly == true)
		return;

	// se o campo nao estiver oculto
	if($tc(this).not(':hidden')){

		switch (this)	{
			case "data":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimento_1":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimento_2":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimento_3":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimento_4":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicao_1":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicao_2":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicao_3":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicao_4":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataCasamento_1":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataCasamento_2":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataCasamento_3":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataCasamento_4":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimentoCojugue_1":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimentoCojugue_2":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimentoCojugue_3":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataNascimentoCojugue_4":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicaoCojugue_1":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicaoCojugue_2":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicaoCojugue_3":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "dataExpedicaoCojugue_4":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "vencimento":
				if ( !ValidarData(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpf_1":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpf_2":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpf_3":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpf_4":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpfCojugue_1":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpfCojugue_2":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpfCojugue_3":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
			case "cpfCojugue_4":
				if ( !ValidarCPF(field.value) ) {
					field.style.border  = "2px solid red";
					return false;
				}
				break;
		}

		 // campos obrigat?ios
		if ( (field.value == "")						&& (
			  (field.id == "nacionalidade_1"				   ) ||
			  (field.id == "nacionalidade_2"				   ) ||
			  (field.id == "nacionalidade_3"				   ) ||
			  (field.id == "nacionalidade_4"				   ) ||
			  (field.id == "valorTotalExtenso"			) ||
			  (field.id == "estadoCivil_1"					) ||
			  (field.id == "estadoCivil_2"					) ||
			  (field.id == "estadoCivil_3"					) ||
			  (field.id == "estadoCivil_4"					) ||
			  (field.id == "vencimento"					) ||
			  (field.id == "orgaoEmissor_1"				   ) ||
			  (field.id == "orgaoEmissor_2"				   ) ||
			  (field.id == "orgaoEmissor_3"				   ) ||
			  (field.id == "orgaoEmissor_4"				   ) ||
			  (field.id == "profissao_1"					   ) ||
			  (field.id == "profissao_2"					   ) ||
			  (field.id == "profissao_3"					   ) ||
			  (field.id == "profissao_4"					   ) ||
			  (field.id == "cpf_1"							   ) ||
			  (field.id == "cpf_2"							   ) ||
			  (field.id == "cpf_3"							   ) ||
			  (field.id == "cpf_4"							   ) ||
			  (field.id == "vendedora"					   ) ||
			  (field.id == "numero"						   ) ||
			  (field.id == "valorSinal"					) ||
			  (field.id == "valorTotal"					) ||
			  (field.id == "nome"						   ) ||
			  (field.id == "indiceReajuste"				) ||
			  (field.id == "cnpjVendedora"				) ||
			  (field.id == "proposta"					   ) ||
			  (field.id == "naturalidade_1"				   ) ||
			  (field.id == "naturalidade_2"				   ) ||
			  (field.id == "naturalidade_3"				   ) ||
			  (field.id == "naturalidade_4"				   ) ||
			  (field.id == "data"						   ) ||
			  (field.id == "rg_1"							   ) ||
			  (field.id == "rg_2"							   ) ||
			  (field.id == "rg_3"							   ) ||
			  (field.id == "rg_4"							   ) ||
			  (field.id == "area"						   ) ||
			  (field.id == "valorSaldo"					) ||
			  (field.id == "dataNascimento_1"				) ||
			  (field.id == "dataNascimento_2"				) ||
			  (field.id == "dataNascimento_3"				) ||
			  (field.id == "dataNascimento_4"				) ||
			  (field.id == "valorSinalExtenso"			) ||
			  (field.id == "empreendimento"				) ||
			  (field.id == "valorSaldoExtenso"			) ||
			  (field.id == "cidade_1"						   ) ||
			  (field.id == "cidade_2"						   ) ||
			  (field.id == "cidade_3"						   ) ||
			  (field.id == "cidade_4"						   ) ||
			  (field.id == "bairro_1"						   ) ||
			  (field.id == "bairro_2"						   ) ||
			  (field.id == "bairro_3"						   ) ||
			  (field.id == "bairro_4"						   ) ||
			  (field.id == "quadra"						   ) ||
			  (field.id == "foneResidencial_1"				) ||
			  (field.id == "foneResidencial_2"				) ||
			  (field.id == "foneResidencial_3"				) ||
			  (field.id == "foneResidencial_4"				) ||
			  (field.id == "endereco_1"					   ) ||
			  (field.id == "endereco_2"					   ) ||
			  (field.id == "endereco_3"					   ) ||
			  (field.id == "endereco_4"					   ) ||
			  (field.id == "quantidadeParcelas___1"	) ||
			  (field.id == "valorParcela___1"			) ) )	{

				field.style.border  = "2px solid red";
				return false;
		}
		 // valida informa?es do conjugue quando estado civil for casado
		 if ( (field.value == ""									) &&
			 (document.getElementById("estadoCivil_1").value == "casado") && (
				 (field.id == "regimeCasamento_1"						) ||
				 (field.id == "conjugue_1"							) ||
				 (field.id == "dataNascimentoCojugue_1"				) ||
				 (field.id == "profissaoCojugue_1"					) ||
				 (field.id == "nacionalidadeCojugue_1"				) ||
				 (field.id == "naturalidadeCojugue_1"					) ||
				 (field.id == "cpfCojugue_1"							) ||
				 (field.id == "rgCojugue_1"							) ||
				 (field.id == "orgaoEmissorCojugue_1"					) ) )	{
				field.style.border  = "2px solid red";
				return false;
		}

		if ( (field.value == ""									) &&
			 (document.getElementById("estadoCivil_2").value == "casado") && (
				 (field.id == "regimeCasamento_2"						) ||
				 (field.id == "conjugue_2"							) ||
				 (field.id == "dataNascimentoCojugue_2"				) ||
				 (field.id == "profissaoCojugue_2"					) ||
				 (field.id == "nacionalidadeCojugue_2"				) ||
				 (field.id == "naturalidadeCojugue_2"					) ||
				 (field.id == "cpfCojugue_2"							) ||
				 (field.id == "rgCojugue_2"							) ||
				 (field.id == "orgaoEmissorCojugue_2"					) ) )	{
				field.style.border  = "2px solid red";
				return false;
		}

		if ( (field.value == ""									) &&
			 (document.getElementById("estadoCivil_3").value == "casado") && (
				 (field.id == "regimeCasamento_3"						) ||
				 (field.id == "conjugue_3"							) ||
				 (field.id == "dataNascimentoCojugue_3"				) ||
				 (field.id == "profissaoCojugue_3"					) ||
				 (field.id == "nacionalidadeCojugue_3"				) ||
				 (field.id == "naturalidadeCojugue_3"					) ||
				 (field.id == "cpfCojugue_3"							) ||
				 (field.id == "rgCojugue_3"							) ||
				 (field.id == "orgaoEmissorCojugue_3"					) ) )	{
				field.style.border  = "2px solid red";
				return false;
		}

		if ( (field.value == ""									) &&
			 (document.getElementById("estadoCivil_4").value == "casado") && (
				 (field.id == "regimeCasamento_4"						) ||
				 (field.id == "conjugue_4"							) ||
				 (field.id == "dataNascimentoCojugue_4"				) ||
				 (field.id == "profissaoCojugue_4"					) ||
				 (field.id == "nacionalidadeCojugue_4"				) ||
				 (field.id == "naturalidadeCojugue_4"					) ||
				 (field.id == "cpfCojugue_4"							) ||
				 (field.id == "rgCojugue_4"							) ||
				 (field.id == "orgaoEmissorCojugue_4"					) ) )	{
				field.style.border  = "2px solid red";
				return false;
		}

		 // valida informa?es do conjugue quando estado civil for casado
			if ( (field.value == "") && (!field.readOnly) && (field.id == "indiceOutros") ) {
				field.style.border  = "2px solid red";
				return false;
			}

	}

	field.style.border  = "";
	return true;
}

function ValidarCPF(cpf) {

    if (cpf == "")
        return true;
    var cpfNumeros = RemoverCaracteres("1234567890", cpf);
    if (cpfNumeros == "99999999999")
        return true;

    if (cpfNumeros.length != 11 || cpfNumeros == "00000000000" || cpfNumeros == "11111111111" || cpfNumeros == "22222222222" || cpfNumeros == "33333333333" || cpfNumeros == "44444444444" || cpfNumeros == "55555555555" || cpfNumeros == "66666666666" || cpfNumeros == "77777777777" || cpfNumeros == "88888888888" || cpfNumeros == "99999999999")
        return false;

    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpfNumeros.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpfNumeros.charAt(9)))
        return false;

    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpfNumeros.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpfNumeros.charAt(10)))
        return false;

    return true;
}

function RemoverCaracteres(caracteresValidos, strInput) {

    var strRetorno = "";
    var tam = Tamanho(strInput);

    for (var i = 0; i < tam; i++) {
        if ( caracteresValidos.indexOf(strInput.substring(i, i + 1)) > 0 ||
        	 caracteresValidos.substring(0, 1) == strInput.substring(i, i + 1) )
            strRetorno += strInput.substring(i, i + 1);
    }
    return strRetorno;
}

function Tamanho(valor) {
    var tam = 0;
    try {
    	tam = valor.length();
    }
    catch(e){
    	tam = valor.length;
    }
    return tam;
}

function FloatToMoeda(num) {

    x = 0;

    if (num < 0) {
        num = Math.abs(num);
        x = 1;
    }

    if (isNaN(num)) num = "0";
    cents = Math.floor((num * 100 + 0.5) % 100);

    num = Math.floor((num * 100 + 0.5) / 100).toString();

    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.'
               + num.substring(num.length - (4 * i + 3));

    ret = num + ',' + cents;

    if (x == 1) ret = ' - ' + ret; return ret;

}


//**************** fun?es utilizada para formata?o dos campos

function VerificarNumero(valor) {

    var digitosValidos = "0123456789";

    if (digitosValidos.indexOf(valor) < 0)
        return false;

    return true;
}

function FormatarCampo(campo, mascara, evento) {
    /* mascara deve ser:
        # para qualquer caracter;
        9 para numericos;
        X para texto; */

	if (!handleEnter(campo, evento))
		return;

    var i = campo.value.length;
    if (i >= mascara.length)
        return false;

    var texto = mascara.substring(i);
    i = 0;
    var digitoMascara = texto.substring(i, i + 1);
    while (digitoMascara != '#' && digitoMascara != 'X' && digitoMascara != '9' && i < texto.length) {
        campo.value += digitoMascara;
        i++;
        digitoMascara = texto.substring(i, i + 1);
    }

    if (VerificarNumero(String.fromCharCode(evento.keyCode))) {
        if (digitoMascara == 'X')
            return false;
    }
    else {
        if (digitoMascara == '9')
            return false;
    }
}

function FormatarValor(campo, separadorMilhar, separadorDecimal, evento, tamanhoMax) {

	if (!handleEnter(campo, evento))
		return;

    if (campo.readOnly)
        return false;

    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';
    var whichCode = (window.Event) ? evento.which : evento.keyCode;

    if (whichCode == 13)
        return true;

    key = String.fromCharCode(whichCode);  // Valor para o c?igo da Chave
    if (strCheck.indexOf(key) == -1)
        return false;  // Chave inv?ida

    len = campo.value.length;
    if (len >= tamanhoMax)
        return false;

    for (i = 0; i < len; i++)
        if ((campo.value.charAt(i) != '0') && (campo.value.charAt(i) != separadorDecimal))
            break;
    aux = '';
    for (; i < len; i++)
        if (strCheck.indexOf(campo.value.charAt(i)) != -1)
            aux += campo.value.charAt(i);

    aux += key;
    len = aux.length;
    if (len == 0)
        campo.value = '';
    if (len == 1)
        campo.value = '0' + separadorDecimal + '0' + aux;
    if (len == 2)
        campo.value = '0' + separadorDecimal + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += separadorMilhar;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        campo.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            campo.value += aux2.charAt(i);
        campo.value += separadorDecimal + aux.substr(len - 2, len);
    }
    return false;
}


//**************** fun?es utilizadas para tratamento de datas

function IniciarData() {

    var data = document.getElementById("data");

    data.value = RetornarDataAtual();
}

function RetornarDataAtual() {

    hoje = new Date();
    dia = hoje.getDate();
    mes = hoje.getMonth() + 1; // comeca em zero
    ano = hoje.getFullYear();

    if (dia < 10)
        dia = "0" + dia;

    if (mes < 10)
        mes = "0" + mes;

    if (ano < 2000)
        ano = "19" + ano;

    return dia + "/" + mes + "/" + ano;
}

function FormatarData(campo, evento) {

	if (!handleEnter(campo, evento))
		return;

    var valorCampo = "";
    var digitosValidos = "0123456789";
    var teclaDigitada = String.fromCharCode(evento.keyCode);

    if (digitosValidos.indexOf(teclaDigitada) < 0)
        return false;

    valorCampo = campo.value;
    if (campo.value.length >= 5)
        campo.value = valorCampo.substring(0, 5) + "/" + valorCampo.substring(6);
    else if (campo.value.length >= 2)
        campo.value = valorCampo.substring(0, 2) + "/" + valorCampo.substring(3);
}



//**************** fun?es utilizada habilitar campo Outros do Indice de Reajuste

/*
function SelecionarIndiceReajuste(opcaoSelecionada) {

    var campoIndiceOutros = document.getElementById("indiceOutros");

    if (opcaoSelecionada.value == "outros")	{
   		campoIndiceOutros.readOnly = false;
        campoIndiceOutros.focus();
    }
    else	{
    		campoIndiceOutros.value = "";
    		campoIndiceOutros.readOnly = true;
		}
}
*/
function SelecionarIndiceReajuste(opcaoSelecionada) {

    //var campoIndiceOutros = document.getElementById("indiceOutros");
		//$tc('.campoIndiceOutros').hide();

		switch(opcaoSelecionada) {

			case "outros" :
				$tc('.campoIndiceOutros').css({ position: "relative" }).show();

		}


    if (opcaoSelecionada == "outros")	{
   		$tc('.campoIndiceOutros').css({
        position: "relative"
    }).show();
   		$tc('#indiceOutros').focus();
    }
    else	{
    	$tc('.campoIndiceOutros').hide();
		}
}

//**************** fun?es utilizadas na tabela de cheque dp Pagamento do Sinal

function SelecionarPagamentoSinal(opcaoSelecionada) {

    switch(opcaoSelecionada) {

    	case "cheque":
    		$tc('#divCheque').css({ position: "relative" }).show();
    		$tc('#divBoleto').hide();
    		$tc('#divOutros').hide();
    		break;

    	case "outros":
    		$tc('#divOutros').css({ position: "relative" }).show();
    		$tc('#divBoleto').hide();
    		$tc('#divCheque').hide();
    		break;

    	default:
    		$tc('#divBoleto').css({ position: "relative" }).show();
    		$tc('#divCheque').hide();
    		$tc('#divOutros').hide();
    }
}

function RetornarCampoOpcao(idRadio, opcao) {

    var opcaoAux = null;
    var opcoes = document.getElementsByName(idRadio);

    for (var i = 0; i < opcoes.length; i++) {
        opcaoAux = opcoes[i];
        if (opcaoAux.value == opcao)
            return opcaoAux;
    }
}

function SelecionarFormaPagamento(opcaoSelecionada) {

    opcaoSelecionada.checked = true;

    var opcoesParcela = document.getElementsByName("parcelas");
    for (var i = 0; i < opcoesParcela.length; i++) {

        var campoValorParcela = document.getElementById("valorP" + opcoesParcela[i].value.substring(1));
        if (campoValorParcela != null) {

            if (campoValorParcela.id == "valorP" + opcaoSelecionada.value.substring(1)) {
                campoValorParcela.readOnly = false;
                campoValorParcela.focus();
            }
            else {
                campoValorParcela.value = "";
                campoValorParcela.readOnly = true;
            }

            var campoQtdParcelas = document.getElementById("quantidadeParcelas");
            if (campoQtdParcelas != null) {
                if (opcaoSelecionada.value == "parcelasX") {
                    campoQtdParcelas.readOnly = false;
                    campoQtdParcelas.focus();
                }
                else {
                    campoQtdParcelas.value = "";
                    campoQtdParcelas.readOnly = true;
                }
            }
        }
    }
}

function intToString(valor) {
    // retorna string valor com underlines (ex.valor: 1, retorno: ___1)

    var strValor = "____" + valor;
    strValor = strValor.substring(strValor.length - 4, strValor.length);

    return strValor;
}

// retorna inteiro da sequencia do campo (ex. idCampo: campo___1, retorno: 1)
function stringToInt(idCampo) {

	var retorno = 0;
	var aux = "";

	if (idCampo.length > 4) {
		aux = idCampo.substring(idCampo.length - 4, idCampo.length);
		aux = aux.replace(/_/g, ""); // substitui todos _ (underline)
		retorno = parseInt(aux);
		if (isNaN(retorno))
			retorno = 0;
	}

	return retorno;
}

// utilizado nas rotinas para retornar valor por extenso
aTens = [ "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "oitenta", "Noventa"];
aOnes = [ "Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove" ];
aCent = [ "Cem", "Duzentos", "Trezentos", "Quatrocentos", "Quinhentos", "Seissentos", "Setecentos", "Oitocentos", "Novecentos" ];

function ConvertToHundreds(num) {
	var cNum, nNum;
	var cWords = "";
	num %= 1000;
	if (num > 99) {
		/* centenas */
		cNum = String(num);
		nNum = Number(cNum.charAt(0));
		cWords = aCent[nNum-1];
		if (( (num > 101) || (num == 101) ) && cWords == "Cem")
			cWords = "Cento";
		num %= 100;
		if (num > 0)
			cWords += " e ";
	}
	if (num > 19) {
		/* Tens. */
		cNum = String(num);
		nNum = Number(cNum.charAt(0));
		cWords += aTens[nNum - 2];
		num %= 10;
		if (num > 0)
			cWords += " e ";
	}
	if (num > 0) {
		/* Ones and teens. */
		nNum = Math.floor(num);
		cWords += aOnes[nNum];
	}
	return cWords;
}

function ConvertToWords(num)
{
	var aUnits = [ "Mil", "Milhões", "Bilhões", "Trilhões", "Quatrilhões" ];
	var aUnists2 = [ "Mil", "Milhão", "Bilhão", "Trilhão", "Quatrilhão" ];
	var cWords = (num >= 1 && num < 2) ? "Real " : "Reais ";
	var nLeft = Math.floor(num);

	for (var i = 0; nLeft > 0; i++) {
		if (nLeft % 1000 > 0) {
			if (i != 0)
				cWords = ConvertToHundreds(nLeft) + " " + aUnits[i - 1] + " " + cWords;
			else
				cWords = ConvertToHundreds(nLeft) + " " + cWords;
		}
		nLeft = Math.floor(nLeft / 1000);
	}
	num = Math.round(num * 100) % 100;
	if (num > 0)
		cWords += " e " + ConvertToHundreds(num) + " Centavos";

	return cWords;
}

function MostrarExtenso()	{
	MostrarExtensoCampo("valorSinal");
	MostrarExtensoCampo("valorSaldo");
	MostrarExtensoCampo("valorIntermediacaoImob");
	MostrarExtensoCampo("valorParcela");
	MostrarExtensoCampo("valorTotal");
	MostrarExtensoCampoPorClasse("valorParcela");
}

function MostrarExtensoCampo(campo)	{

	var valorExtenso = $tc("#"+campo).is('span') ? $tc("#"+campo).text() : $tc("#"+campo).val();

	if ( campo != null && valorExtenso != "" && Number(valorExtenso.replace(",",".")) != 0 ) {
		var valor = valorExtenso.replace(".","");
		$tc("."+campo+"_Extenso").text(ConvertToWords(valor.replace(",",".")));
	}

}

function MostrarExtensoCampoPorClasse(campo)	{

	var valorExtenso = $tc("#"+campo).is('span') ? $tc("#"+campo).text() : $tc("#"+campo).val();

	if ( campo != null && valorExtenso != "" && Number(valorExtenso.replace(",",".")) != 0 ) {
		var valor = valorExtenso.replace(".","");
		$tc("."+campo+"_Extenso").text(ConvertToWords(valor.replace(",",".")));
	}

}

function zoomEmpreendimento() {
	window.open("/webdesk/zoom.jsp?title=Consulta de Empreendimentos&datasetId=empreendimento&dataFields=empreendimento,Empreendimento&resultFields=empreendimento&type=empreendimento&filterValues=metadata_active,true", "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");
}

function zoomImobiliaria() {
	window.open("/webdesk/zoom.jsp?title=Consulta de Imobiliarias&datasetId=imobiliaria&dataFields=codigo,C?igo,nome,Nome,cnpj,CNPJ&resultFields=nome,cnpj&type=imobiliaria&filterValues=metadata_active,true", "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");
}

function zoomImovel() {
	var empr = document.getElementById("empreendimento").value;

	if (empr == "")
		window.open("/webdesk/zoom.jsp?title=Consulta de Im?eis&datasetId=imovel&dataFields=codigo,C?igo,numero,Numero,quadra,Quadra,area,?rea,empreendimento,Empreendimento&resultFields=numero,quadra,area,codigo&type=imovel&filterValues=metadata_active,true,liberado,true", "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");
	else
		window.open("/webdesk/zoom.jsp?title=Consulta de Im?eis&datasetId=imovel&dataFields=codigo,C?igo,numero,Numero,quadra,Quadra,area,?rea,empreendimento,Empreendimento&resultFields=numero,quadra,area,codigo&type=imovel&filterValues=metadata_active,true,liberado,true,empreendimento," + empr, "zoom", "status, scrollbars=no, width=600, height=300, top=0, left=0");

}

function setSelectedZoomItem(selectedItem) {

	if (selectedItem.type == "empreendimento")
		document.getElementById("empreendimento").value = selectedItem.empreendimento;

	if (selectedItem.type == "imobiliaria") {
		document.getElementById("vendedora").value = selectedItem.nome;
		document.getElementById("cnpjVendedora").value = selectedItem.cnpj;
	}

	if (selectedItem.type == "imovel") {

		document.getElementById("quadra").value = selectedItem.quadra;
		document.getElementById("numero").value = selectedItem.numero;
		document.getElementById("area").value = selectedItem.area;
		document.getElementById("codigoImovel").value = selectedItem.codigo;
	}
}

function mostraLista() {
    window.open("lista.html", "list", "width=640,height=480");
}
