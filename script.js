/* REVENGEE CORE ENGINE
   Author: revengee2919@gmail.com
   Social: @Wacut_e
*/

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const feed = document.getElementById('feed');
    
    // بيانات تجريبية أولية
    let issues = [
        {
            id: 101,
            author: "@Wacut_e",
            code: "function error() {\n  console.log('Error 404: Logic Not Found');\n}",
            date: "الآن"
        }
    ];

    const renderFeed = () => {
        feed.innerHTML = '';
        issues.forEach(item => {
            const card = document.createElement('div');
            card.className = "card bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 relative overflow-hidden";
            card.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <span class="text-green-500 font-bold text-sm">${item.author}</span>
                    <span class="text-[9px] text-zinc-600 font-mono">HASH_${item.id}</span>
                </div>
                <pre><code>${item.code}</code></pre>
                <div class="mt-4 flex justify-between items-center">
                    <button class="text-xs text-zinc-400 hover:text-white transition-colors">📄 إضافة حل برمجـي</button>
                    <span class="text-[10px] text-zinc-700 italic">SYSTEM BY REVENGEE</span>
                </div>
            `;
            feed.appendChild(card);
        });
    };

    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('devName').value;
        const code = document.getElementById('rawCode').value;

        if (name && code) {
            const newIssue = {
                id: Math.floor(Math.random() * 10000),
                author: name,
                code: code,
                date: "الآن"
            };

            issues.unshift(newIssue);
            renderFeed();
            
            // مسح الحقول بعد النشر
            document.getElementById('devName').value = '';
            document.getElementById('rawCode').value = '';

            // تأثير بصري للنجاح
            console.log("تم النشر بواسطة نظام ريفنجي بنجاح.");
        } else {
            alert("يرجى إدخال المعرف والكود أولاً.");
        }
    });

    renderFeed();
});
