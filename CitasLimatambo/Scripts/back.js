

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

var MyAppBack = {
    inputs: {
        placeholders: function () {
            $('input, textarea').placeholder();
        },
        isNumerico: function () {
            $('.numerico').keypress(function (tecla) {
                if (tecla.charCode < 48 || tecla.charCode > 57) return false;
            });
        },
        customMethod: function () {
            $.validator.addMethod("customemail",
                function (value, element) {
                    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
                }
            );
        }
    },
    contacto: {
        afiliar: function () {
            $('#formulario-afiliar').validate({
                errorPlacement: function (error, element) {
                    if ($("#formulario-afiliar #terminos").length && !$("#formulario-afiliar #terminos").is(":checked")) $('#terminos').next().addClass('novalidate'); else $('#terminos').next().removeClass('novalidate');
                    return true;
                },
                submitHandler: function (error, element) {
                    if ($("#formulario-afiliar #terminos").length && !$("#terminos").is(":checked")) {
                        $("#terminos").parent().next().addClass('novalidate');
                    } else {
                        registroUsuario('formulario-afiliar');
                    }
                },
                rules: {
                    nombres: {
                        required: true,
                        minlength: 3,
                        maxlength: 30
                    },
                    apellidos: {
                        required: true,
                        minlength: 3,
                        maxlength: 30
                    },
                    fecha_nacimiento: {
                        required: true
                    },
                    tipo_documento: {
                        required: true
                    },
                    numero_documento: {
                        required: true,
                        minlength: 6
                    },
                    telefono: {
                        required: true,
                        minlength: 5,
                        maxlength: 13
                    },
                    email: {
                        required: true,
                        email: true,
                        customemail: true
                    },
                    consulta: {
                        required: true,
                        minlength: 3
                    }
                },
                wrapper: 'span',
                onfocusout: function (element) { $(element).valid(); },
                onkeyup: function (element) { $(element).valid(); }
            });
        },
        contactanos: function () {
            $('#formulario-contactanos').validate({
                errorPlacement: function (error, element) {
                    if ($("#formulario-contactanos #terminos").length && !$("#formulario-contactanos #terminos").is(":checked")) $('#terminos').parent().next().addClass('novalidate'); else $('#terminos').parent().next().removeClass('novalidate');
                    return true;
                },
                submitHandler: function (error, element) {
                    if ($("#formulario-contactanos #terminos").length && !$("#terminos").is(":checked")) {
                        $("#terminos").parent().next().addClass('novalidate');
                    } else {
                        registroUsuario('formulario-contactanos');
                    }
                },
                rules: {
                    nombres: {
                        required: true,
                        minlength: 3,
                        maxlength: 50
                    },
                    email: {
                        required: true,
                        email: true,
                        customemail: true
                    },
                    telefono: {
                        required: true,
                        minlength: 5,
                        maxlength: 13
                    },
                    consulta: {
                        required: true,
                        minlength: 3
                    }
                },
                wrapper: 'span',
                onfocusout: function (element) { $(element).valid(); },
                onkeyup: function (element) { $(element).valid(); }
            });
        },
        suscribete: function () {
            $('#formulario-suscribete').validate({
                errorPlacement: function (error, element) {
                    return true;
                },
                submitHandler: function (error, element) {
                    registroUsuario('formulario-suscribete');
                },
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                },
                wrapper: 'span',
                onfocusout: function (element) { $(element).valid(); },
                onkeyup: function (element) { $(element).valid(); }
            });
        },
        laboratorio: function () {
            $('#formulario-laboratorio').validate({
                errorPlacement: function (error, element) {
                    return true;
                },
                rules: {
                    login: {
                        required: true
                    },
                    clave: {
                        required: true
                    }
                },
                onfocusout: function (element) { $(element).valid(); }
            });
        },
        consulta_linea: function () {
            $('#formulario-consulta-linea').validate({
                errorPlacement: function (error, element) {
                    return true;
                },
                rules: {
                    historia: {
                        required: true
                    },
                    dni: {
                        required: true
                    }
                },
                onfocusout: function (element) { $(element).valid(); }
            });
        },
    }
}

$("#terminos").click(function () {
    if ($("#terminos").is(":checked")) $('#terminos').parent().next().removeClass('novalidate');
});

function registroUsuario(form) {

    if (form == "formulario-contactanos" || form == "formulario-afiliar") {

        if ($('#txt_recaptcha_extension').val() == "") {
            return;
        }

    }


    var datos = "";
    //$('.img-loader').css('display','block');
    $("#" + form + "#enviarFormulario").attr('disabled', true);
    $("#" + form + "#enviarFormulario").css('cursor', 'default');
    $('#enviarFormulario').attr('disabled', true);
    datos = $("#" + form).serialize();
    //console.log(datos);

    $.ajax({
        type: "POST",
        url: $("#template_url").val() + "/inc/controllerUsuario.php",
        dataType: "json",
        data: datos,
        beforeSend: function (data) {
            console.log('data', data);
            let enviando = $('#textos-js').data('enviando');
            $('#enviarFormulario').val(enviando + ' ...');
            $('#enviarFormulario').html(enviando + ' ...');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('jqXHR', jqXHR);
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
        },
        success: function (resp) {
            console.log('ok', resp);
            if (resp) {
                if (resp.tipo == "ok") {
                    //window.location = 'gracias.php';
                    $("#nombres").val('');
                    $("#apellidos").val('');
                    $("#email").val('');
                    $("#telefono").val('');
                    $("#consulta").val('');
                    $("#fecha_nacimiento").val('dd/mm/aaaa');
                    $("#tipo_documento option:nth(0)").attr("selected", "selected");
                    $("#numero_documento").val('');
                    $('#terminos').parent().next().removeClass('novalidate');
                    $('#terminos').prop('checked', false);
                    let registrado = $('#textos-js').data('registrado');
                    $('#enviarFormulario').val(registrado + ' !');
                    $('#enviarFormulario').html(registrado + ' !');


                    window.setInterval(" $('#enviarFormulario').val('enviar'); $('#enviarFormulario').attr('disabled',false); ", 5000);

                } else {
                    alert(resp.mensaje);
                    //$('.img-loader').css('display','none');
                    $('#enviarFormulario').attr('disabled', false);
                }
            }
        }

    });
}


$(document).ready(function () {
    //MyAppBack.inputs.placeholders();
    //MyAppBack.inputs.isNumerico();
    MyAppBack.inputs.customMethod();
    //MyAppBack.general.setGTMConfiguration();
    //$('#nombres').focus();

    if ($('#formulario-afiliar').length) {
        MyAppBack.contacto.afiliar();
    };
    if ($('#formulario-contactanos').length) {
        MyAppBack.contacto.contactanos();
    };
    if ($('#formulario-suscribete').length) {
        MyAppBack.contacto.suscribete();
    };
    if ($('#formulario-laboratorio').length) {
        MyAppBack.contacto.laboratorio();
    };
    if ($('#formulario-consulta-linea').length) {
        MyAppBack.contacto.consulta_linea();
    };

    $("#buscarNoticias").click(function (e) {
        var mesNoticias = $('#mesNoticias').val();
        var anioNoticias = $('#anioNoticias').val();

        if (mesNoticias != 'todo') {
            $('.novedades > div').addClass('ocultaNotiMes');
            $('.novedades > div').addClass('ocultaNotiAnio');

            $('.container .novedades > div[mes="' + mesNoticias + '"]').removeClass('ocultaNotiMes');
            $('.container .novedades > div[anio="' + anioNoticias + '"]').removeClass('ocultaNotiAnio');
        } else {
            $('.novedades > div').removeClass('ocultaNotiMes');
            $('.novedades > div').removeClass('ocultaNotiAnio');
        }

        $('.container .novedades > div').removeClass('ocultaMasPost');
        $(".btn.btn-red-rec").addClass('ocultaMasPost');

        filtroNoticias(mesNoticias, anioNoticias);
    });

    $(".btn.btn-red-rec").click(function (e) {
        e.preventDefault();
        var cont = parseInt($('#contadorNoticias').val());
        cont++;
        $('#contadorNoticias').val(cont);
        $('.novedades > div.ocultaMasPost.posic' + cont).removeClass('ocultaMasPost');

        var cno = 0;
        $("#filtroNoticias .ocultaMasPost").each(function () {
            cno++;
        });

        if (cno == 0) {
            $('.btn.btn-red-rec').hide();
        }

    });

    /* Formulario de Cuotas y Rango de Edad */
    $(document).on('change', '.form-control.rangoEdades', function () {
        var idRangoEdad = $(this).attr('id').substr(9);
        if ($('#txtMiembro' + idRangoEdad + '').val() != "") {
            $('#txtCosto' + idRangoEdad + '').val($(this).val());
        }
    });


    $(document).on('click', '.box-menos', function (e) {
        e.preventDefault();
        $(this).parent().remove();
    });

    $("#btn-agregar").click(function (event) {
        event.preventDefault();

        var contenedorPostulante = $("#contenedor-principal").clone();
        contenedorPostulante.removeAttr("id");
        var boton = $(this);
        var cont = parseInt(boton.attr('contador'));
        if (!cont) { cont = 0; }

        var btnquitar = '';
        btnquitar += '<a class="btn-menos" style="display: block !important;"><span>-</span></a>';

        contenedorPostulante.find('input, select').each(function () {
            if ($(this).is('input')) {
                $(this).removeClass('error');
                if ($(this).attr('id') == "txtMiembro1") {
                    $(this).val('');
                    $(this).attr('id', 'txtMiembro' + cont);
                    $(this).attr('name', 'txtMiembro' + cont);
                } else if ($(this).attr('id') == "txtCosto1") {
                    $(this).attr('id', 'txtCosto' + cont).val('');
                    $(this).attr('name', 'txtCosto' + cont);
                }
            } else if ($(this).is('select')) {
                $('option:eq(0)', this).prop('selected', true);
                $(this).removeClass('error');
                if ($(this).attr('id') == "rangoEdad1") {
                    $(this).attr('id', 'rangoEdad' + cont);
                    $(this).attr('name', 'rangoEdad' + cont);
                }
            }



        });


        cont++;
        boton.attr('contador', cont);
        boton.parent().before(contenedorPostulante);
        contenedorPostulante.find('.box-menos').html(btnquitar);
    });

    // Beneficios Plan Salud
    $("#todosBeneficiosPlan").click(function (e) {
        e.preventDefault();
        $('.novedades .box-all > div').removeClass('ocultaMasPost');
        $(this).addClass('ocultaMasPost');
    });

    // Buscar Plantel Medico
    $("#buscarDr").click(function (e) {
        //ListaPlantelMedico02();
        $('#buscarPlantel').submit();
    });

    //Start compartir en redes sociales
    $(document).on('click', '.box-share a', function () {
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        var w = "";
        var h = "";
        var top = "";
        var left = "";
        var url = $(this).attr('data-url');
        var domain = url.split("/")[2];

        switch (domain) {
            case "www.facebook.com":
                w = 585;
                h = 368;
                break;
            case "twitter.com":
                w = 585;
                h = 320;
                break;
            case "plus.google.com":
                w = 517;
                h = 511;
                break;
            case "mail.google.com":
                w = 517;
                h = 511;
                break;
            case "pinterest.com":
                w = 517;
                h = 511;
                break;
            case "www.linkedin.com":
                w = 517;
                h = 511;
                break;
            default:
                w = 517;
                h = 511;
        }

        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;

        window.open(url, 'sharer', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        return false;
    });
    //End compartir en redes sociales

});

// Convertir Primer caracter en Mayuscula
String.prototype.ucwords = function () {
    str = this.toLowerCase();
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
        function ($1) {
            return $1.toUpperCase();
        });
}

function filtroNoticias(mesNoticias, anioNoticias) {
    var data = [];
    data['mes'] = mesNoticias;
    data['anio'] = anioNoticias;
    data['lang'] = $('#textos-js').data('lang');
    //var search = $.trim($('#palabraClaveProfesor').val());
    var data = {
        'mes': data['mes'],
        'anio': data['anio'],
        'lang': data['lang']
    };

    $("#filtroNoticias").html('');
    var accion = "noticiasResult";
    $.ajax({
        type: "POST",
        url: $("#ajax_url").val(),
        data: { action: accion, data: data },
        beforeSend: function () {
            var section = '';
            section += '<table style="text-align:center;width: 100%;">'
            section += '<tr>'
            section += '<td colspan="3" style="width:770px;">'
            section += '<div id="cargandoajax" style="text-align:center;">'
            section += '<p style="padding:0px"><img style="width: 5%;" src="' + $("#template_url").val() + '/images/gif-load.gif" alt="loading"/></p>'
            section += '<p style="padding:0px">cargando...</p>'
            section += '</div>'
            section += '</td>'
            section += '</tr>'
            section += '</table> ';
            $("#filtroNoticias").html('');
            $("#filtroNoticias").html(section);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + "--" + textStatus + "--" + errorThrown);
        },
        success: function (resp) {
            $("#filtroNoticias").html('');
            $("#filtroNoticias").html(resp);
        }
    });
}

/* webservice */
/*
function ListaEspecialidades() {
  var data = {
    'method': 'ListaEspecialidad'
  }

  //$('#ListaEspecialidades').html('<option value="" selected="selected"> Selecciona... </option>');
  $.ajax({
        url: '/ws-crp/service.php',
        type: 'POST',
        data: data,
        dataType: 'json',
        cache: false,
        success: function (data) {
            if(data==null || data=="" || data==false){
              $('#ListaEspecialidades').html('<option value="" selected="selected"> No hay Especialidades </option>');
              return false;
            }

            var especialidades = '';
            elem=data.E_Especialidad;

            for (var i = 0; i < elem.length; i++) {
              CODIGO_ESPECIALIDAD=elem[i].CODIGO_ESPECIALIDAD;
              ESPECIALIDAD=elem[i].ESPECIALIDAD;
              DES_CONTENIDO_ESPECIALIDAD=elem[i].DES_CONTENIDO_ESPECIALIDAD;

              // Seleted: Home y Plantel Medico
              //$('#espe-'+CODIGO_ESPECIALIDAD).append(ESPECIALIDAD);

              // Home Destokp
              //$('.g-table-cell.espe-'+CODIGO_ESPECIALIDAD+' h3').append(ESPECIALIDAD);
              //$('.g-table-cell.espe-'+CODIGO_ESPECIALIDAD+' p.ws').append(DES_CONTENIDO_ESPECIALIDAD.substr(0,150)+' ...');

              // Home Movil
              //$('.box-detalle.espe-'+CODIGO_ESPECIALIDAD+' h3').append(ESPECIALIDAD);
              //$('.box-detalle.espe-'+CODIGO_ESPECIALIDAD+' .texto p.ws').append(DES_CONTENIDO_ESPECIALIDAD.substr(0,100)+' ...');

              // Servicios Asistenciales y Apoyo al Diagnotico
             // $('.owl-servicio-diagnostico.owl-carousel.owl-theme .espe-'+CODIGO_ESPECIALIDAD).append(MaysPrimera(ESPECIALIDAD.toLowerCase()));
            }
        },
        error: function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR+"--"+textStatus+"--"+errorThrown);
        }
      });
}
*/

/*
function ListaPlantelMedico(target) {
  var idSede = '';
  var nombreDr = '';
  var idEspecialidad = '';

  $('#target').val(target);
  if($('#nombreDr').val() && $('#nombreDr').val().trim()) nombreDr = $('#nombreDr').val();
  if($('#idSede').val() && $('#idSede').val().trim()) idSede = $('#idSede').val();
  if($('#idEspecialidad').val() && $('#idEspecialidad').val().trim()) idEspecialidad = $('#idEspecialidad').val();

  var data = {
    'method': 'getListaPlantelMedico',
    'nombreDr': nombreDr,
    'idSede': idSede,
    'idEspecialidad': idEspecialidad
  }

  $('#itemContainerMedico02').html('');
  $.ajax({
        url: '/ws-crp/service.php',
        type: 'POST',
        data: data,
        dataType: 'json',
        cache: false,
        beforeSend: function() {
          var section='';
          section+='<table style="text-align:center;width: 100%;">';
          section+='<tr><td>';
          section+='<p style="padding:0px"><img style="width: 15%;" src="'+$("#template_url").val()+'/images/gif-load.gif" alt="loading"/></p>';
          section+='<p style="padding:0px">cargando...</p>';
          section+='</td></tr>';
          section+='</table> ';

          $('#itemContainerMedico02').html('<ul id="itemContainerMedico"><li class="hidden"><a href=""><figure><img src="/medicosfotos/doctorsilueta.jpg"></figure></a></li><li style="width: 45%;">'+section+'</li><li class="hidden"><a href=""><figure><img src="/medicosfotos/doctorsilueta.jpg"></figure></a></li></ul>');
        },
        success: function (data) {
            if(data==null || data=="" || data==false){
              $('#itemContainerMedico02').html('<h3> No hay Doctor(s) disponibles </h3>');
              return false;
            }

            var datosMedicos = [];
            if(data.CODIGO_COLEGIO_MEDICO){
                 var obj = {
                  CODIGO_COLEGIO_MEDICO: data.CODIGO_COLEGIO_MEDICO,
                  DESCRIPCION: data.NOMBRES+'/'+data.IDE_SEDE+'/'+data.ESPECIALIDAD+'/'+data.IDE_ESPECIALIDAD+'/'+data.NUM_ANEXO_TELEFONO
                 };
                 datosMedicos.push(obj);
            } else {
              for (var i = 0; i < data.length; i++) {
                 var obj = {
                  CODIGO_COLEGIO_MEDICO: data[i].CODIGO_COLEGIO_MEDICO,
                  DESCRIPCION: data[i].NOMBRES+'/'+data[i].IDE_SEDE+'/'+data[i].ESPECIALIDAD+'/'+data[i].IDE_ESPECIALIDAD+'/'+data[i].NUM_ANEXO_TELEFONO
                 };
                 datosMedicos.push(obj);
              }
            }
            //console.log(data.length);
            resultListaPlantelMedico(datosMedicos);
        },
        error: function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR+"--"+textStatus+"--"+errorThrown+"capo");
        }
      });
}

function resultListaPlantelMedico(datosMedicos){
   var target = $('#target').val();
   var accion = "plantelDrResult";
   var cmpEspecialidadDoctor = "";

   if($('#cmpEspecialidadDoctor').val()) cmpEspecialidadDoctor = $('#cmpEspecialidadDoctor').val().split(';');

   $.ajax({
      type: "POST",
      url: $("#ajax_url").val(),
      dataType: 'html',
      cache: false,
      data: {
        action:accion,
        data:datosMedicos,
        target:target,
        cmpEspecialidadDoctor:cmpEspecialidadDoctor
      },
      error: function(jqXHR, textStatus, errorThrown ) {
       alert(jqXHR+"--"+textStatus+"--"+errorThrown+"capo02");
      },
      success: function(resp) {
        $("#itemContainerMedico02").html('');
        $("#itemContainerMedico02").html(resp);
      }
   });
}
*/

/*
function DetalleMedico() {
  var idSede = $('#idSede').val();
  var idespecialidad = $('#idespecialidad').val();
  var cmp = $('#cmp').val();

  var data = {
    'method': 'getDetalleMedico',
    'cmp': cmp
  }

  $.ajax({
        url: '/ws-crp/service.php',
        type: 'POST',
        data: data,
        dataType: 'json',
        cache: false,
        success: function (data) {
            if(data==null || data=="" || data==false){
              $('#detalleMedico').html('<h3>  </h3>');
              return false;
            }

            if(data.length > 1){
              for (var i = 0; i < data.length; i++) {
                IDE_ESPECIALIDAD=data[i].IDE_ESPECIALIDAD;
                if (IDE_ESPECIALIDAD == idespecialidad) data=data[i];
              }
            }

            var APELLIDO_MATERNO=data.APELLIDO_MATERNO.ucwords();
            var APELLIDO_PATERNO=data.APELLIDO_PATERNO.ucwords();
            var NOMBRES=data.NOMBRES.ucwords();
            var ESPECIALIDAD=data.ESPECIALIDAD.ucwords();
            var CATEGORIA=data.CATEGORIA;

            var CODIGO_COLEGIO_MEDICO=data.CODIGO_COLEGIO_MEDICO;
            var CONSULTORIO_UBICACION=data.CONSULTORIO_UBICACION;
            var IDE_SEDE=data.IDE_SEDE;

            var TIPO_ATENCION=data.TIPO_ATENCION;
            var TIPO_COLEGIATURA=data.TIPO_COLEGIATURA;

            var imagenDr = '/medicosfotos/'+CODIGO_COLEGIO_MEDICO+'.jpg';
            if(!file_exists(imagenDr)) imagenDr = '/medicosfotos/doctorsilueta.jpg';

            var detalleDr = '<h1>'+APELLIDO_PATERNO+' '+APELLIDO_MATERNO+', '+NOMBRES+'</h1>'+
                            '<b class="txt-cargo">'+ESPECIALIDAD+'</b>'+
                            '<p>CATEGORIA: '+CATEGORIA+'</p>'+
                            '<p>CONSULTORIO UBICACION: '+CONSULTORIO_UBICACION+'</p>'+
                            '<p>IDE SEDE: '+IDE_SEDE+'</p>'+
                            '<p>TIPO DE ATENCION: '+TIPO_ATENCION+'</p>'+
                            '<p>TIPO DE COLEGIATURA: '+TIPO_COLEGIATURA+'</p>'+
                            '<div class="row">'+
                              '<span><img src="'+$("#template_url").val()+'/images/plantel-medico/icon-cmp.png" alt="CMP"></span>'+
                              '<span>CMP '+CODIGO_COLEGIO_MEDICO+'</span>'+
                            '</div>'+
                            '<div class="row">'+
                              '<img src="'+$("#template_url").val()+'/images/plantel-medico/icon-email.png" alt="email">'+
                              '<a href="mailto:amanrique@rcp.com.pe">amanrique@rcp.com.pe</a>'+
                            '</div>'+
                            '<div class="row"><img src="'+$("#template_url").val()+'/images/plantel-medico/icon-tel.png" alt="Tel">524 2224 - Anexo 589</div>';

            $('#detalleMedico').append(detalleDr);
            $('#imagenDr').append('<img src="'+imagenDr+'">');
            $('#ubicacion').val(CONSULTORIO_UBICACION);
        },
        error: function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR+"--"+textStatus+"--"+errorThrown);
        }
      });
}
*/

/*
function HorarioMedico() {
  var cmp = $('#cmp').val();

  var data = {
    'method': 'getHorarioMedico',
    'cmp': cmp
  }

  $.ajax({
        url: '/ws-crp/service.php',
        type: 'POST',
        data: data,
        dataType: 'json',
        cache: false,
        beforeSend: function() {
          var section='';
          $('#sedeHorarios').append('<div class="item"><div class="container-box"><div class="box box-1"><div class="g-table"><div class="g-table-cell"><img src="images/plantel-medico/icon-direccion.png" alt="direcciÃ³n"><strong>DirecciÃ³n</strong>Av. Javier Prado Este 1066 - San Isidro</div></div></div><div class="box box-2"><div class="g-table"><div class="g-table-cell"><img src="images/plantel-medico/icon-ubicacion.png" alt="UbicaciÃ³n"><strong>ubicaciÃ³n</strong>Torre 9 - Piso 7</div></div></div><div class="box box-3"><div class="g-table"><div class="g-table-cell"><strong>Horario de atenciÃ³n</strong><ul><li><span>lunes :</span><span>17:00 - 22:00</span></li><li><span>martes :</span><span>17:00 - 22:00</span></li><li><span>miercoles :</span><span>17:00 - 22:00</span></li><li><span>jueves :</span><span>17:00 - 22:00</span></li></ul></div></div></div></div></div><div class="item"><div class="container-box"><div class="box box-1"><div class="g-table"><div class="g-table-cell"><img src="images/plantel-medico/icon-direccion.png" alt="direcciÃ³n"><strong>DirecciÃ³n</strong>Av. Javier Prado Este 1066 - San Isidro</div></div></div><div class="box box-2"><div class="g-table"><div class="g-table-cell"><img src="images/plantel-medico/icon-ubicacion.png" alt="UbicaciÃ³n"><strong>ubicaciÃ³n</strong>Torre 9 - Piso 7</div></div></div><div class="box box-3"><div class="g-table"><div class="g-table-cell"><strong>Horario de atenciÃ³n</strong><ul><li><span>lunes :</span><span>17:00 - 22:00</span></li><li><span>martes :</span><span>17:00 - 22:00</span></li><li><span>miercoles :</span><span>17:00 - 22:00</span></li></ul></div></div></div></div></div><div class="item"><div class="container-box"><div class="box box-1"><div class="g-table"><div class="g-table-cell"><img src="images/plantel-medico/icon-direccion.png" alt="direcciÃ³n"><strong>DirecciÃ³n</strong>Av. Javier Prado Este 1066 - San Isidro</div></div></div><div class="box box-2"><div class="g-table"><div class="g-table-cell"><img src="images/plantel-medico/icon-ubicacion.png" alt="UbicaciÃ³n"><strong>ubicaciÃ³n</strong>Torre 9 - Piso 7</div></div></div><div class="box box-3"><div class="g-table"><div class="g-table-cell"><strong>Horario de atenciÃ³n</strong><ul><li><span>lunes :</span><span>17:00 - 22:00</span></li><li><span>martes :</span><span>17:00 - 22:00</span></li><li><span>miercoles :</span><span>17:00 - 22:00</span></li></ul></div></div></div></div></div>');
        },
        success: function (data) {
            if(data==null || data=="" || data==false){
              $('#sedeHorarios').html('<h3> No hay Horarios para este Doctor </h3>');
              return false;
            }

            var horario = '';
            var LUNES = '';
            var MARTES = '';
            var MIERCOLES = '';
            var JUEVES = '';
            var VIERNES = '';
            var SABADO = '';
            var DOMINGO = '';
            $('#contHorarioWS').val(data.length);

            for (var i = 0; i < 8; i++) {
              if(i < data.length) {
                CTURNO=data[i].CTURNO;
                if(data[i].LUNES) LUNES=data[i].LUNES;
                if(data[i].MARTES) MARTES=data[i].MARTES;
                if(data[i].MIERCOLES) MIERCOLES=data[i].MIERCOLES;
                if(data[i].JUEVES) JUEVES=data[i].JUEVES;
                if(data[i].VIERNES) VIERNES=data[i].VIERNES;
                if(data[i].SABADO) SABADO=data[i].SABADO;
                if(data[i].DOMINGO) DOMINGO=data[i].DOMINGO;

                var dias = '';
                if(LUNES.trim()) dias += '<li><span>lunes :</span><span>'+LUNES+'</span></li>';
                if(MARTES.trim()) dias += '<li><span>martes :</span><span>'+MARTES+'</span></li>';
                if(MIERCOLES.trim()) dias += '<li><span>miercoles :</span><span>'+MIERCOLES+'</span></li>';
                if(JUEVES.trim()) dias += '<li><span>jueves :</span><span>'+JUEVES+'</span></li>';
                if(VIERNES.trim()) dias += '<li><span>viernes :</span><span>'+VIERNES+'</span></li>';
                if(SABADO.trim()) dias += '<li><span>sÃ¡bado :</span><span>'+SABADO+'</span></li>';
                if(DOMINGO.trim()) dias += '<li><span>domingo :</span><span>'+DOMINGO+'</span></li>';

                $('.item.'+i+' .container-box .box.box-3 .g-table .g-table-cell ul').html('');
                if(dias.trim()) $('.item.'+i+' .container-box .box.box-3 .g-table .g-table-cell ul').append(dias);
                else $('.item.'+i+' .container-box .box.box-3 .g-table .g-table-cell ul').append('<li>No hay horarios disponibles</li>');
                $('.item.'+i+' .container-box .box.box-2 .g-table .g-table-cell ul').append($('#ubicacion').val());
                //$('.item.'+i+' .container-box .box.box-2 .g-table .g-table-cell ul').append($("#template_url").val()+'/images/plantel-medico/icon-direccion.png');
              } else {
                $('.item.'+i).parent().remove();
              }
            }
            $('.owl-dots').html($(".owl-dot").slice(0,data.length));
        },
        error: function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR+"--"+textStatus+"--"+errorThrown);
        }
      });
}
*/

/*
function Especialidad() {
  var idEspecialidad = $('#idEspecialidad').val();

  var data = {
    'method': 'getEspecialidad',
    'idEspecialidad': idEspecialidad
  }

  $.ajax({
        url: '/ws-crp/service.php',
        type: 'POST',
        data: data,
        dataType: 'json',
        cache: false,
        success: function (data) {
            if(data==null || data=="" || data==false){
              //$('#sedeHorarios').html('<h3> No ahy Doctor(s) Asignados a esta Especialidad </h3>');
              return false;
            }

            ESPECIALIDAD=data.ESPECIALIDAD;
            DES_CONTENIDO_ESPECIALIDAD=data.DES_CONTENIDO_ESPECIALIDAD.split(".");

            // Single Especialdiad
            //$('.banner .container .g-table .g-table-cell h2 span').append(MaysPrimera(ESPECIALIDAD.toLowerCase()));
            //$('.banner .container .g-table .g-table-cell p.ws').append(DES_CONTENIDO_ESPECIALIDAD[0]);
        },
        error: function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR+"--"+textStatus+"--"+errorThrown);
        }
      });
}
*/

function file_exists(url) {
    // Returns true if filename exists
    //
    // version: 909.322
    // discuss at: http://phpjs.org/functions/file_exists    // +   original by: Enrique Gonzalez
    // +      input by: Jani Hartikainen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // %        note 1: This function uses XmlHttpRequest and cannot retrieve resource from different domain.
    // %        note 1: Synchronous so may lock up browser, mainly here for study purposes.     // *     example 1: file_exists('http://kevin.vanzonneveld.net/pj_test_supportfile_1.htm');
    // *     returns 1: '123'

    var req = this.window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    if (!req) { throw new Error('XMLHttpRequest not supported'); }
    // HEAD Results are usually shorter (faster) than GET
    req.open('HEAD', url, false);
    req.send(null);
    if (req.status == 200) {
        return true;
    }

    return false;
}

/*
function EspecialidadMedico() {
  var idEspecialidad = $('#idEspecialidad').val();

  var data = {
    'method': 'getEspecialidadMedico',
    'idEspecialidad': idEspecialidad
  }

  $.ajax({
        url: '/ws-crp/service.php',
        type: 'POST',
        data: data,
        dataType: 'json',
        cache: false,
        success: function (data) {
            if(data==null || data=="" || data==false){
              $('#especialidadMedico').html('<h3> No hay Doctor(s) Asignados a esta Especialidad </h3>');
              return false;
            }

            var dcotores1 = '';
            var dcotores2 = '';
            var dcotores3 = '';
            var NUM_ANEXO_TELEFONO='';
            var DrSimple = 0;
            //console.log(data);

            if(data.CODIGO_MEDICO){
                NOMBRES=data.NOMBRES.ucwords();
                CODIGO_COLEGIO_MEDICO=data.CODIGO_COLEGIO_MEDICO;

                if(data.NUM_ANEXO_TELEFONO.trim()) NUM_ANEXO_TELEFONO=' - Anexo '+data.NUM_ANEXO_TELEFONO;

                dcotores1 = dcotores1 + '<div class="container">'+
                                          '<div class="left">'+
                                            '<h4>'+NOMBRES+'</h4>'+
                                            '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum nec nulla vel eleifend. Praesent vestibulum fermentum est id sodales. Praesent molestie iaculis lorem, vel tempus diam dapibus quis. In congue maximus venenatis.</p>'+
                                            '<ul>'+
                                              '<li><i class="icon-email"></i>'+
                                              '<p>rodriguez@rcp.com.pe</p>'+
                                              '<p></p>'+
                                              '</li>'+
                                              '<li><i class="icon-telefono-home"></i>'+
                                              '<p>524 2224 '+NUM_ANEXO_TELEFONO+'</p>'+
                                              '<p></p>'+
                                              '</li>'+
                                            '</ul>'+
                                            '<a class="btn btn-red" href="/detalle-medico/?cmp='+CODIGO_COLEGIO_MEDICO+'">ver mÃ¡s</a>'+
                                          '</div>'+
                                          '<div class="right"><img src="/medicosfotos/'+CODIGO_COLEGIO_MEDICO+'.jpg" alt="image"></div>'+
                                      '</div>';
                //$('#especialidadMedico').append('<div class="content-detalle-medico">'+'<h2>Conoce a <b>nuestros doctores</b></h2>'+dcotores1+'</div>');
            } else {
                var porCate = data.slice(0);
                porCate.sort(function(a,b) {
                    var x = a.CATEGORIA.toLowerCase();
                    var y = b.CATEGORIA.toLowerCase();
                    //console.log('x:'+x+'-');
                    //console.log('y:'+y+'-');
                    //console.log('---------');

                    //return x < y ? -1 : x > y ? 1 : 0;
                    return y < x ? -1 : y > x ? 1 : 0;
                });
                console.log('POR CATEGORIA:');
                console.log(porCate);

                for (var i = 0; i < porCate.length; i++) {
                    NOMBRES=porCate[i].NOMBRES.ucwords();
                    CATEGORIA=porCate[i].CATEGORIA;
                    ESPECIALIDAD=porCate[i].ESPECIALIDAD.ucwords();
                    CODIGO_COLEGIO_MEDICO=porCate[i].CODIGO_COLEGIO_MEDICO;

                    if(porCate[i].NUM_ANEXO_TELEFONO.trim()) NUM_ANEXO_TELEFONO=' - Anexo '+porCate[i].NUM_ANEXO_TELEFONO;

                    var imagenDr = '/medicosfotos/'+CODIGO_COLEGIO_MEDICO+'.jpg';
                    if(!file_exists(imagenDr)) imagenDr = '/medicosfotos/doctorsilueta.jpg';

                    if(DrSimple == 0) {
                        if(i%2 == 0) {
                          dcotores1 = dcotores1 + '<div class="container">'+
                                                    '<div class="left">'+
                                                      '<h4>'+NOMBRES+'</h4>'+
                                                      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum nec nulla vel eleifend. Praesent vestibulum fermentum est id sodales. Praesent molestie iaculis lorem, vel tempus diam dapibus quis. In congue maximus venenatis.</p>'+
                                                      '<ul>'+
                                                        '<li><i class="icon-email"></i>'+
                                                        '<p>rodriguez@rcp.com.pe</p>'+
                                                        '<p></p>'+
                                                        '</li>'+
                                                        '<li><i class="icon-telefono-home"></i>'+
                                                        '<p>524 2224 '+NUM_ANEXO_TELEFONO+'</p>'+
                                                        '<p></p>'+
                                                        '</li>'+
                                                      '</ul>'+
                                                      '<a class="btn btn-red" href="/detalle-medico/?cmp='+CODIGO_COLEGIO_MEDICO+'">ver mÃ¡s</a>'+
                                                    '</div>'+
                                                    '<div class="right"><img src="'+imagenDr+'" alt="image"></div>'+
                                                '</div>';
                        } else {
                          dcotores1 = dcotores1 + '<div class="container">'+
                                                    '<div class="right mov"><img src="'+imagenDr+'" alt="image"></div>'+
                                                    '<div class="left">'+
                                                      '<h4>'+NOMBRES+'</h4>'+
                                                      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent condimentum nec nulla vel eleifend. Praesent vestibulum fermentum est id sodales. Praesent molestie iaculis lorem, vel tempus diam dapibus quis. In congue maximus venenatis.</p>'+
                                                      '<ul>'+
                                                        '<li><i class="icon-email"></i>'+
                                                        '<p>rodriguez@rcp.com.pe</p>'+
                                                        '</li>'+
                                                        '<li><i class="icon-telefono-home"></i>'+
                                                        '<p>524 2224 '+NUM_ANEXO_TELEFONO+'</p>'+
                                                        '</li>'+
                                                      '</ul>'+
                                                      '<a class="btn btn-red" href="/detalle-medico/?cmp='+CODIGO_COLEGIO_MEDICO+'">ver mÃ¡s</a>'+
                                                    '</div>'+
                                                  '</div>';
                        }
                    } else {
                        dcotores2 = dcotores2 + '<li>'+
                                                  '<a href="/detalle-medico/?cmp='+CODIGO_COLEGIO_MEDICO+'">'+
                                                    '<figure><img src="'+imagenDr+'" alt="image">'+
                                                      '<p>'+
                                                        '<span><i class="icon-telefono-home"></i> 524 2224 '+NUM_ANEXO_TELEFONO+'</span>'+
                                                        '<span><i class="icon-email"></i> rodriguez@rcp.com.pe</span>'+
                                                        '<span class="btn btn-green">ver detalle</span>'+
                                                      '</p>'+
                                                    '</figure>'+
                                                    '<div class="contenido"><strong>'+NOMBRES+'</strong><span>'+ESPECIALIDAD+'</span></div>'+
                                                  '</a>'+
                                              '</li>';
                    }

                    if(porCate[i+1]) {
                       if(porCate[i].CATEGORIA != porCate[i+1].CATEGORIA) DrSimple = 1;
                    }
                }

                dcotores3 = '<div class="content-detalle-medico">'+
                              '<h2>Conoce a <b>nuestros doctores</b></h2>'+
                                dcotores1+
                            '</div>'+
                            '<div class="container-plantel-medico">'+
                              '<div class="content-plantel-medico">'+
                                '<div class="container">'+
                                  '<ul id="itemContainerMedico">'+dcotores2+'</ul>'+
                                  '<div class="holder"></div>'+
                                '</div>'+
                              '</div>'+
                            '</div>';

                //$('#especialidadMedico').append(dcotores3);
            }
        },
        error: function(jqXHR, textStatus, errorThrown ) {
            alert(jqXHR+"--"+textStatus+"--"+errorThrown);
        }
      });
}
*/

$(document).ready(function () {
    $("#itemContainer li a").hover(
        function () {
            var e = $(this).attr("data-filename");
            $(this).addClass("hover"), $(".content-img").css("background-image", "url(" + e + ")");
        }, function () {
            var d = $(".content-img").attr("img-default");
            $(this).removeClass("hover"), $(".content-img").css("background-image", "url(" + d + ")");
        });

    $(".content-home .content-servicios-asistenciales #itemContainer li a").hover(function () {
        var colorOver = $(this).attr("color");
        $(this).attr("style", "background: " + colorOver + ";");
    });
});


function txNombresNumeros(oToCheckField, oKeyEvent) { //ingresa: letras, numeros if((permitir!=) && (no_permitir==)) || (event.keyCode < 63)
    //alert(oKeyEvent.charCode);
    //alert(oKeyEvent.keyCode);
    //alert(oKeyEvent.which);
    if ((oKeyEvent.keyCode != 8 && oKeyEvent.keyCode != 13 && oKeyEvent.charCode != 32 && (oKeyEvent.keyCode <= 34 || oKeyEvent.keyCode >= 40) && oKeyEvent.keyCode != 46 && oKeyEvent.charCode != 209 && oKeyEvent.charCode != 39 && oKeyEvent.charCode != 241) && (oKeyEvent.charCode <= 43) || (oKeyEvent.charCode > 90) && (oKeyEvent.charCode < 97) || (oKeyEvent.charCode > 122) && (oKeyEvent.charCode < 241) || (oKeyEvent.charCode > 241) || (oKeyEvent.charCode == 47) || (oKeyEvent.charCode < 64) && (oKeyEvent.charCode > 58))
        return false; // Mozilla; Explorer

    if ((event.keyCode != 32 && event.keyCode != 39 && event.keyCode != 13 && event.keyCode != 209 && event.keyCode != 241) && (event.keyCode <= 43) || (event.keyCode > 90) && (event.keyCode < 97) || (event.keyCode > 122) && (event.keyCode < 241) || (event.keyCode > 241) || (event.keyCode == 47) || (event.keyCode < 64) && (event.keyCode > 58) || (event.keyCode == 69) || (event.keyCode != 101) || (event.keyCode == 45))
        event.returnValue = false; //Chrome
}

$('#sResult, #s, #nombreDr, #email, #nombreDr, #serviciosApoyo, #serviciosAsiste, input, textarea').on('keyup', function () { //valida espaciso al inicio
    var valor = $(this).val();
    if (valor.length == 0) $(this).val(valor);
    //var formatos = '/[^A-ZÃ€ÃÃ‚ÃƒÃ„Ã…Ã Ã¡Ã¢Ã£Ã¤Ã¥Ã’Ã“Ã”Ã•Ã–Ã˜Ã²Ã³Ã´ÃµÃ¶Ã¸ÃˆÃ‰ÃŠÃ‹Ã¨Ã©ÃªÃ«Ã‡Ã§ÃŒÃÃŽÃÃ¬Ã­Ã®Ã¯Ã™ÃšÃ›ÃœÃ¹ÃºÃ»Ã¼Ã¿Ã‘Ã±a-z0-9\s]/g'; //no valida
    var formatos = "(*)+<>[]Â´^{}#$%&/=?Â¿Â¡!";
    for (var i = 0; i < valor.length; i++) {
        var caracter = valor.charAt(i);
        //if( $.inArray(caracter,formatos) != -1 ) { //-1: no encuentraen el array
        if (caracter == ' ' && i == 0) {
            $(this).val($.trim(valor));
        } else {
            if (formatos.search(caracter) != -1) {
                if (caracter != '.') {
                    $(this).val(''); //valida cuando pego texto con caracteres
                    break;
                }
            }
        }
    }
});

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function MaysPrimera(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/******** Busqueda Site **********/
/*Start Filtro Search General y por tipo*/
$("#search, #search02, #search03").click(function () {
    $('#alertaBusqueda').css('display', 'block');
    $('#alertaBusqueda').html('Ingrese un texto superior a 2 dÃ­gitos!!');

    if ($('#s').val() && $('#s').val().length > 1) {
        $('#alertaBusqueda').html('');
        $('#buscarPalabra').submit();
    } else if ($('#sResult').val() && $('#sResult').val().length > 1) {
        $('#alertaBusqueda').html('');
        $('#buscarPalabra02').submit();
    } else if ($('#s404').val() && $('#s404').val().length > 1) {
        $('#alertaBusqueda').html('');
        $('#buscarPalabra03').submit();
    }
});

$(document).on('click', '#paginadorPlantel .vPagination a', function (e) {
    e.preventDefault();
    ListaPlantelMedico($(this).attr('href'));
    $("html, body").animate({ scrollTop: (0) }, 1600);
})

$(document).on('click', '#paginadorGeneral .vPagination a', function (e) {
    e.preventDefault();
    $("#textoResultadoSearchGeneral").html('');
    var palabra = $("#sResult").val();
    $("#textoResultadoSearchGeneral").html('Resultados de "' + palabra + '"');
    searchGeneral($(this).attr('href'));
})

$(document).on('click', '#tipoFiltro a', function (e) {
    e.preventDefault();
    $('#tipoFiltro a').attr('data-estado', '');
    $('#tipoFiltro a').removeClass('vCurrent');
    $(this).addClass('vCurrent');
    $(this).attr('data-estado', 'activo');
    searchGeneral();
})
/*End Filtro Search General y por tipo*/

function searchGeneral(target) {
    var search = $("#sResult").val();
    var post_per_page = 20;

    var accion = "searchGeneralResult";
    //console.log(search,target,post_per_page);
    $("#searchGeneral").html('');

    $.ajax({
        type: "POST",
        url: $("#ajax_url").val(),
        data: {
            action: accion,
            search: search,
            target: target,
            post_per_page: post_per_page
        },
        beforeSend: function () {
            var section = '';
            section += '<section class="vPadding-20 vMarginTop-35 vMarginBottom-35">'
            section += '<tr>'
            section += '<td colspan="3" style="width:770px;">'
            section += '<div id="cargandoajax" style="text-align:center;">'
            section += '<p style="padding:0px"><img src="' + $("#template_url").val() + '/images/gif-load.gif" alt="loading"/></p>'
            section += '<p style="padding:0px">cargando...</p>'
            section += '</div>'
            section += '</td>'
            section += '</tr>'
            section += '</section> ';
            $("#searchGeneral").html('');
            $("#searchGeneral").html(section);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + "--" + textStatus + "--" + errorThrown);
        },
        success: function (resp) {
            $("#searchGeneral").html('');
            $("#searchGeneral").html(resp);
        }
    });
}
/******** Fin Busqueda Site **********/


$(document).ready(
    function () {


        $(window).resize(
            function () {

                if ($('#itemContainerMedico').length) {
                    setTimeout(function () {
                        ;
                        //location.reload()
                    }, 1);
                }
            }
        );


    }
);


function ocultarmodal() {

    $('.fancybox-container').addClass('modalct');

}


function funcionselect(val) {
    location = val.value;
    $(val).val("Selecciona...");
}

function funcionselectC(val) {
    nav(val.value);
    document.getElementById("consultasLinea").selectedIndex = 0;
}

function funcionselectC2(id) {

    $('#' + id).val("Selecciona...");
}

function funcionb(val) {
    var buscar = $('#' + val).val();
    location = '/plantel-medico/?' + val + '=' + buscar;

    $('#' + val).val("")

}

// CARGA

$(document).ready(function () {
    //cargar();
});

$('#cargar').click(function (event) {
    event.preventDefault();

    cargar();

});



function cargar() {

    console.log("Gaa");

    var page = $('#page').val();
    nombreDr = $('#nombreDr').val();
    idEspecialidad = $('#idEspecialidad').val();
    vuelta = $('#vuelta').val();
    url_tema = $('#url_tema').val();
    lang = $('#lang').val();

    // var data = "page="+page+"&nombreDr="+nombreDr+"&idEspecialidad="+idEspecialidad+"&lang="+lang;
    var data = {
        page: page,
        nombreDr: nombreDr,
        idEspecialidad: idEspecialidad,
        lang: lang,
        vuelta: vuelta
    }
    // alert(data);
    // console.log('url', url_tema+'inc/carga.php');

    $.post(url_tema + 'inc/carga.php', data, function (response) {

        //console.log(data.sql);
        data = JSON.parse(response);
        // console.log('loop', data);

        mostrar = 1;

        if (data.loop != null) {

            var html = '';
            var np = parseInt(page) + 8;
            $('#page').val(np);

            var n_vuelta = parseInt(vuelta) + 1;
            $('#vuelta').val(n_vuelta);
            var detalle = $('#textos-js').data('detalle');
            var matricula = $('#textos-js').data('matricula');


            for (i = 0; i < data.loop.length; i++) {

                if (mostrar <= 8) {

                    html += '<li>';
                    html += '    <a href="' + data.loop[i].link_doc + '">';
                    html += '        <figure><img src="' + data.loop[i].imagen + '" alt="image">';
                    html += '            <p>';
                    html += '            <span><i class="icon-telefono-home"></i> (511) 224Â·2224</span>';
                    html += '            <span> (511) 224Â·2226</span>';
                    html += '            ' + data.loop[i].num_anexo + '';
                    html += '            <span>' + matricula + ' ' + data.loop[i].colegiatura + '</span>';
                    // html += '            <span class="btn btn-green">'+detalle+'</span>';
                    html += '            </p>';
                    html += '        </figure>';
                    html += '        <div class="contenido">';
                    html += '         <span class="btn btn-green">' + data.loop[i].texto_verperfil + '</span>';
                    html += '            <strong>';
                    html += '                ' + data.loop[i].apellidos + '';
                    html += '                ' + data.loop[i].nombres + '';
                    html += '            </strong>';
                    html += '            <span>';
                    html += '                ' + data.loop[i].cart_servicio + '  ';
                    html += '            </span>';
                    html += '        </div>';
                    html += '    </a>';
                    html += '</li>';

                    mostrar++;

                }




            }


            $("#itemContainerMedico").append(html);

            if (data.loop.length <= 8) {
                $('#cargar').hide();
            }

        } else {

            if (page == 1) {

                html = '<strong> No se encontraron entradas </strong>';

                $("#blog").append(html);
            }

            $('#cargar').hide();
        }


    });



}


if ($('#commentform').length > 0) {
    $('#commentform').submit(function () {
        if ($('#comment').val() == '') {
            $('#comment').focus();
            alert('Debes completar todos los campos');
            return false;
        } else if ($('#commentform #author').length > 0 && $('#commentform #author').val() == '') {
            $('#author').focus();
            alert('Debes completar todos los campos');
            return false;
        } else if ($('#commentform #email').length > 0 && $('#commentform #email').val() == '') {
            $('#commentform #email').focus();
            alert('Debes completar todos los campos');
            return false;
        } else if ($('#commentform #email').length > 0 && !validateEmail($('#email').val())) {
            $('#commentform #email').focus();
            alert('Ingresa tu email correcto');
            return false;
        }
    })
}

function close_accordion_section() {
    $(".accordion-encuentranos .accordion-section-title-encuentranos").removeClass("active");
    $(".accordion-encuentranos .accordion-section-content-encuentranos").slideUp(300).removeClass("open");
    $(".contenido-mapa img").hide();
}

$(".accordion-section-title-encuentranos").click(function (e) {
    e.preventDefault();
    var o = $(this).attr("href");
    var key = $(this).attr("data-key");
    if ($(e.target).is(".active")) {
        close_accordion_section();
    } else {
        close_accordion_section();
        $(this).addClass("active");
        $('#mapa-' + key).show();
        $(".accordion-encuentranos " + o).slideDown(300).addClass("open");
    }
})


$(".accordion-section-title-encuentranos").click(function (e) {
    var o = $(this).attr("href");
    $(e.target).is(".active") ? close_accordion_section() : (close_accordion_section(), $(this).addClass("active"), $(".accordion-encuentranos " + o).slideDown(300).addClass("open")), e.preventDefault()
});

$('.owl-carousel.owl-theme.owl-galeria').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})

$('.owl-carousel.owl-theme.owl-detalle_horario').owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

// $('.owl-carousel.owl-theme.owl-especialidad-detalle').owlCarousel({
//   loop:true,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:1
//       },
//       1000:{
//           items:1
//       }
//   },
//   autoplay: false,
//   autoPlaySpeed: 5000,
//   URLhashListener:true,
//   startPosition: 'URLHash'
// })

// $('.owl-carousel.owl-theme.owl-don-diego').owlCarousel({
//   loop:false,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:3
//       },
//       1000:{
//           items:5
//       }
//   },
//   URLhashListener:true,
//   startPosition: 'URLHash'

// })
/*-----------------------------------------------------------------------------------*/



// var sync1 = $("#sync2");
// var sync2 = $("#bloque_1");



var sync1 = $("#bloque_1");
var sync2 = $("#sync2");
var slidesPerPage = 4;
var syncedSecondary = true;

sync1.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: true,
    autoplay: true,
    dots: true,
    loop: true,
    responsiveRefreshRate: 200,
}).on('changed.owl.carousel', syncPosition);

sync2
    .on('initialized.owl.carousel', function () {
        sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
        items: slidesPerPage,
        dots: true,
        nav: true,
        smartSpeed: 200,
        slideSpeed: 500,
        slideBy: slidesPerPage,
        responsiveRefreshRate: 100
    }).on('changed.owl.carousel', syncPosition2);

function syncPosition(el) {

    var count = el.item.count - 1;
    var current = Math.round(el.item.index - (el.item.count / 2) - .5);

    if (current < 0) {
        current = count;
    }
    if (current > count) {
        current = 0;
    }

    //


    sync2
        .find(".owl-item")
        .removeClass("current")
        .eq(current)
        .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();

    if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
}

function syncPosition2(el) {
    if (syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
    }
}

sync2.on("click", ".owl-item", function (e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
});




/*-----------------------------------------------------------------------------------------------------------------------------------*/
// $(function(){
// var owl = $('.owl-especialidad-detalle ');
// owl.owlCarousel({
//   // autoplay: 2000,
//   // items:1,
//   onInitialized  : counter, //When the plugin has initialized.
//   onTranslated : counter //When the translation of the stage has finished.
// });

// function counter(event) {
//    // var element   = event.target;         // DOM element, in this example .owl-carousel
//     // var items     = event.item.count;     // Number of items
//     var item      = event.item.index;     // Position of the current item
//   // $('#counter').html("item "+item+" of "+items)
//   console.log(item);
// }
// });
/*--------------------------------*/
// $(function() {
//   $('.owl-carousel').owlCarousel({
//     center: true,
//     margin: 10,
//     loop: true,
//     items: 7
//   }).on('click', '.owl-item', function(e) {
//     var carousel = $('.owl-carousel').data('owl.carousel');
//     e.preventDefault();
//     carousel.to(carousel.relative($(this).index()));
//   });
// });






$('.owl-carousel.owl-theme.owl-nuestros_valores').owlCarousel({
    loop: false,
    margin: 30,
    nav: true,
    autoHeight: false,
    responsive: {
        0: {
            items: 1,
            dots: true,
            nav: false
        },
        600: {
            items: 2,
            dots: true,
            nav: false
        },
        1000: {
            items: 3,
            dots: true
        },
        1400: {
            items: 4,
            dots: true
        },
        1700: {
            items: 5
        }
    },
})


$('.owl-carousel.owl-theme.owl-linea-de-tiempo').owlCarousel({
    loop: false,
    margin: 2,
    nav: true,
    autoHeight: false,
    responsive: {
        0: {
            items: 1,
            dots: true,
            nav: false
        },
        600: {
            items: 2,
            dots: true,
            nav: false
        },
        1000: {
            items: 3,
            dots: true
        },
        1400: {
            items: 4,
            dots: true
        },
        1700: {
            items: 5
        }
    },
})


$('.owl-carousel.owl-theme.owl-reconocimientos1').owlCarousel({
    loop: false,
    margin: 15,
    nav: true,
    autoHeight: false,
    responsive: {
        0: {
            items: 1,
            dots: true,
            nav: false
        },
        600: {
            items: 2,
            dots: true,
            nav: false
        },
        1000: {
            items: 3,
            dots: true
        },
        1400: {
            items: 4,
            dots: true
        },
        1700: {
            items: 5
        }
    },
})


//Funciones reCaptcha
// function recaptchaCallback() {
//   $('#txt_recaptcha').val(grecaptcha.getResponse(0));   
// };

function recaptchaCallback_extension() {
    //console.log(grecaptcha.getResponse(1));
    $('#txt_recaptcha_extension').val(grecaptcha.getResponse(0));
};

$(".owl-prev").html("");
$(".owl-next").html("");





