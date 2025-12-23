/* REVENGEE CORE ENGINE v3.0 - THE FINAL STACK
   Includes: Karma System, Copy Mechanism, and Reply System
*/

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const feed = document.getElementById('feed');
    
    // مصفوفة البيانات (تحتوي على مشكلة تجريبية مع حلولها)
    let issues = [
        {
            id: 1,
            author: "@Wacut_e",
            code: "// كيف أطبع نص في الجافاسكربت؟\nprint('Hello');",
            karma: 100,
            solutions: [
                { user: "AI_Assistant", text: "استخدم console.log('Hello'); بدلاً من print" }
            ]
        }
    ];

    // دالة لتحديد الرتبة
    const getRank = (p) => p > 150 ? "ELITE" : p > 50 ? "PRO" : "NOOB";

    // دالة عرض المحتوى بالكامل
    const renderFeed = () => {
        feed.innerHTML = '';
        issues.forEach(item => {
            const card = document.createElement('div');
            card.className = "bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 mb-6";
            
            card.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-2">
                        <span class="text-green-400 font-bold">${item.author}</span>
                        <span class="karma-badge">${getRank(item.karma)}</span>
                    </div>
                    <span class="text-[10px] text-zinc-600 font-mono">ID: ${item.id}</span>
                </div>

                <div class="relative group">
                    <button onclick="copyCode(this)" class="copy-btn">نسخ</button>
                    <pre><code class="code-content">${item.code}</code></pre>
                </div>

                <div class="mt-4 space-y-3">
                    ${item.solutions.map(sol => `
                        <div class="solution-card">
                            <p class="text-[10px] text-zinc-500 mb-1">${sol.user} رد بـ :</p>
                            <code class="text-xs text-zinc-200">${sol.text}</code>
                        </div>
                    `).join('')}
                </div>

                <div class="mt-6 pt-4 border-t border-zinc-800 flex justify-between items-center">
                    <button onclick="toggleReply(${item.id})" class="text-xs text-green-500 font-bold hover:underline">
                        + إضافة حل (رد)
                    </button>
                    <button onclick="vote(${item.id})" class="text-xs text-zinc-500 hover:text-white transition">
                        ▲ دعم (${item.karma})
                    </button>
                </div>

                <div id="reply-box-${item.id}" class="hidden mt-4 space-y-2">
                    <textarea id="input-${item.id}" placeholder="اكتب حلك البرمجي هنا..." class="input-field text-xs h-20"></textarea>
                    <button onclick="postSolution(${item.id})" class="bg-green-600 text-black text-[10px] px-4 py-2 rounded-lg font-bold">نشر الرد</button>
                </div>
            `;
            feed.appendChild(card);
        });
    };

    // وظائف النظام
    window.copyCode = (btn) => {
        const code = btn.parentElement.querySelector('.code-content').innerText;
        navigator.clipboard.writeText(code);
        btn.innerText = "تم!";
        setTimeout(() => btn.innerText = "نسخ", 2000);
    };

    window.toggleReply = (id) => {
        document.getElementById(`reply-box-${id}`).classList.toggle('hidden');
    };

    window.vote = (id) => {
        const issue = issues.find(i => i.id === id);
        issue.karma += 5;
        renderFeed();
    };

    window.postSolution = (id) => {
        const text = document.getElementById(`input-${id}`).value;
        if(!text) return;
        const issue = issues.find(i => i.id === id);
        issue.solutions.push({ user: "Guest_Dev", text: text });
        renderFeed();
    };

    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('devName').value;
        const code = document.getElementById('rawCode').value;
        if(name && code) {
            issues.unshift({ id: Date.now(), author: "@"+name, code: code, karma: 0, solutions: [] });
            renderFeed();
            document.getElementById('devName').value = '';
            document.getElementById('rawCode').value = '';
        }
    });

    renderFeed();
});

