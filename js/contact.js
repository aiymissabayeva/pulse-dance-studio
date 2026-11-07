
$(document).ready(function () {

    const fields = ["name", "email", "message"];

    function getError(field, value) {
        if (value === "") {
            return "This field is required.";
        }

        if (field === "name" && value.length < 2) {
            return "Enter at least 2 characters.";
        }

        if (field === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {
                return "Enter a valid email address.";
            }
        }

        if (field === "message" && value.length < 10) {
            return "Enter at least 10 characters.";
        }

        return "";
    }

    function validateField(field) {
        const input = $("#" + field);
        const value = input.val().trim();
        const error = getError(field, value);

        $("#" + field + "Error").text(error);

        input.toggleClass("is-invalid", error !== "");
        input.toggleClass("is-valid", error === "");

        return error === "";
    }

    $("#contactForm").on("input", "input, textarea", function () {
        if (fields.includes(this.id)) {
            validateField(this.id);
        }

        $("#formStatus").text("");
    });

    $("#contactForm").on("submit", function (event) {
        event.preventDefault();

        let isValid = true;

        fields.forEach(function (field) {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            $("#formStatus")
                .text("Thank you! Your message has been validated successfully.")
                .hide()
                .fadeIn(300);

            this.reset();

            $("#contactForm")
                .find("input, textarea")
                .removeClass("is-valid is-invalid");
        } else {
            $("#formStatus")
                .text("Please correct the errors above.")
                .hide()
                .fadeIn(300);
        }
    });

});
