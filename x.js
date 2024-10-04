    jQuery(document).ready(function($) {
        $("#btn").click(function(event) {
            event.preventDefault();
            var selectedSite = window.selectedSiteValue || $(".dropdown .selected").text().toLowerCase().replace(/\s+/g, '-');
            var url = "";

            switch (selectedSite) {
                case "CoolCima":
                case "CinemaTy":
                case "halacima":
                case "dramacafe":
                case "cimalina":
                case "animeluxe":
                case "joycinema":
                case "lodynet":
                case "NewAnime4up":
                case "shed4u1":
                case "tuktukcinema":
                case "WeCima":
                case "zimabadk":
                    url = '<?= plugin_dir_url(__FILE__) ?>../includes/inc/ThemeX.php';
                    break;
                default:
                    $("#textsucc").html("يرجي اختيار موقع اولا!");
                    $("#btnText").text("بدء السحب");
                    $("#btn").removeClass("active");
                    $(".loader").removeClass("show");
                    return;
            }

            $(".loader").addClass("show");
            $("#textsucc").empty(); // إخفاء الرسالة السابقة

            $.ajax({
                url: url,
                type: 'POST',
                data: { 
                    valueText: $("textarea[name=urls]").val(),
                    Site: $(".active").attr("data-value"),
                    api: "aHR0cHM6Ly9hcGlzLndpdHRhbmltZS5jb20=",
                },
            })
            .done(function() {
                const currentTime = new Date().toLocaleTimeString(); // الوقت بالتنسيق المحلي
                const siteName = $(".active").attr("data-value") || selectedSite; // الحصول على اسم الموقع
                $("#textsucc").html(`تم استخراج البيانات من ${siteName} بنجاح!  ${currentTime}`);
                
                // إضافة رسالة جديدة إلى سجل الرسائل
                $("#messageLog").append(`<div>تم استخراج البيانات من ${siteName} بنجاح!  ${currentTime}</div>`);
            })
            .fail(function() {
                const currentTime = new Date().toLocaleTimeString(); // الوقت بالتنسيق المحلي
                const siteName = $(".active").attr("data-value") || selectedSite; // الحصول على اسم الموقع
                $("#textsucc").html(`حدث خطأ أثناء استخراج البيانات من ${siteName}.  ${currentTime}`);
                
                // إضافة رسالة جديدة إلى سجل الرسائل
                $("#messageLog").append(`<div>حدث خطأ أثناء استخراج البيانات من ${siteName}.  ${currentTime}</div>`);
            })
            .always(function() {
                $(".loader").removeClass("show");
                $("#btnText").text("بدء السحب"); // إعادة النص إلى "بدء السحب"
                $("#btn").removeClass("active"); // إزالة الكلاس "active"
            });

            $("#btnText").text("جاري السحب");
            $("#btn").addClass("active");
        });

        // إظهار مربع الرسائل عند الضغط على الزر
        $("#showMessagesBtn").click(function() {
            $("#messageBox").toggle(); // إظهار أو إخفاء المربع
        });
    });
