var beneficiarios = [];
$(document).ready(function () {
    if (obj) {
        beneficiarios = [];
        $('#formCadastro #CPF').val(obj.CPF);
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        beneficiarios = obj.Beneficiarios;
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "CPF": $(this).find("#CPF").val(),
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "Beneficiarios": beneficiarios
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })

    $('#btnBeneficiarios').click(function (e) {
        e.preventDefault();
        $.post("../Beneficiarios", "").done(function (res) {
            $('body').append(res);

            $('#modalBeneficiario').modal('show');
            $('#CPFBeneficiario').mask('000.000.000-00', { reverse: true });
            $('#btnIncluirBeneficiario').click(function (e) {
                e.preventDefault();
                if (($("#CPFBeneficiario").val() != $("#CPF").val()) && ($("#CPFBeneficiario").val() != "") && ($("#nomeBeneficiario").val() != "")) {

                    if (validarCPF($("#CPFBeneficiario").val())) {

                        if (!beneficiarios.some(item => item.CPF === $("#CPFBeneficiario").val())) {
                            beneficiarios.push({ "CPF": $("#CPFBeneficiario").val(), "Nome": $("#nomeBeneficiario").val() });
                            gerarTableBeneficiarios();
                            $("#CPFBeneficiario").val("");
                            $("#nomeBeneficiario").val("");

                        } else
                            ModalDialog("CPF Existente!", "Já existe um cliente cadastrado com este CPF");
                    }
                    else
                        ModalDialog("CPF Inválido!", "CPF informado é inválido!");
                }
            });
            gerarTableBeneficiarios();
        });
    });
})

function gerarTableBeneficiarios() {
    $("#tableBeneficiarios tbody").empty();
    beneficiarios.forEach(function (item, index) {
        $("#tableBeneficiarios tbody").append("<tr><td>" + item.CPF + "</td><td>" + item.Nome + "</td><td> <button type='button' onclick='editarBeneficiarios(\"" + item.CPF + "\", \"" + item.Nome + "\")'  class='btn btn-primary btn-sm'>Editar</button> <button type='button' onclick='deleteBeneficiarios(\"" + item.CPF + "\", \"" + item.Nome + "\")'  class='btn btn-primary btn-sm'>Remover</button></td><tr>");
    });
}

function deleteBeneficiarios(cpf, nome) {
    beneficiarios = beneficiarios.filter(function (value, index, arr) {
        return (value.CPF != cpf || value.Nome != nome);
    });
    gerarTableBeneficiarios();
}

function editarBeneficiarios(cpf, nome) {
    $("#CPFBeneficiario").val(cpf);
    $("#nomeBeneficiario").val(nome);
    deleteBeneficiarios(cpf, nome);
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
