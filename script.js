// فنكشن إرسال البيانات للسيرفر
async function sendBooking() {
    const nameInput = document.getElementById("username").value;
    const phoneInput = document.getElementById("userphone").value;
    const messageInput = document.getElementById("message").value;

    const bookingData = {
        name: nameInput,
        phone: phoneInput,
        message: messageInput
    };
    if (!nameInput || !phoneInput) {
        alert("يرجى ملء الحقول المطلوبة: الاسم ورقم الهاتف");
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        // تحويل الرد لـ JSON
        const result = await response.json();

        if (response.ok) {
            console.log("تم الحجز بنجاح:", result);
            alert("تم إرسال طلبك بنجاح!");
        } else {
            console.error("فشل الحجز:", result.error);
            alert("حدث خطأ: " + result.error);
        }
    } catch (error) {
        // ده جزء الـ Debugging لو السيرفر مش شغال مثلاً
        console.error("حدث خطأ في الاتصال بالسيرفر:", error);
        alert("لا يمكن الاتصال بالسيرفر حالياً");
    }
}

// فنكشن التمرير لأسفل
function scrollToContact() {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
    }
}