$('document').ready(function () {
    $("#chat").click(function () {
        $("#conversa").show();
        $("#sala").hide();
        ocultaNavbar();
    });

    $("#video").click(function () {
        $("#sala").show();
        $("#conversa").hide();
        ocultaNavbar();
    });
});
function ocultaNavbar() {
    $("#btn_navbar_toggle").attr("class", "navbar-toggle collapsed");
    $("#navbar-collapse-1").attr("class", "navbar-collapse collapse");
    $("#btn_navbar_toggle").attr("aria-expanded", "false");
    $("#navbar-collapse-1").attr("aria-expanded", "false");
}