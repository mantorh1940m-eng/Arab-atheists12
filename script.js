
/* REVENGEE CORE ENGINE v2.0 - Karma System
   Author: revengee2919@gmail.com | @Wacut_e 
*/

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    const feed = document.getElementById('feed');
    
    // بيانات تجريبية مع نظام النقاط
    let issues = [
        {
            id: 101,
            author: "@Wacut_e",
            code: "function main() {\n  return 'Success';\n}",
            karma: 150,
            rank: "MASTER"
        }
    ];

    const getRank = (points) => {
        if (points < 50) return "NOOB";
        if (points < 100) return "CODER";
        if (points < 200) return "PRO";
        return "ELITE";
    };

    const renderFeed = () => {
        feed.innerHTML = '';
        issues.forEach(item => {
            const card = document.createElement('div');
            card.className = "card bg-zinc-900/40 p-6 rounded-3xl border border-zinc-800 mb-6";
            card.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-3">
                        <span class="text-green-500 font-bold">${item.author}</span>
                        <span class="karma-badge">${getRank(item.karma)}</span>
                    </div>
                    <div class="text-right">
                        <span class="text-[9px] text-zinc-500 block">POINTS: ${item.karma} XP</span>
                        <div class="xp-bar w-20"><div class="xp-progress"></div></div>
                    </div>
                </div>
                <pre><code>${item.code}</code></pre>
                <div class="mt-4 flex justify-between items-center">
                    <button onclick="addKarma(${item.id})" class="text-xs text-zinc-400 hover:text-green-500 transition-all flex items-center gap-1">
                        ▲ دعم المبرمج (Vote)
                    </button>
                    <span class="text-[9px] text-zinc-700 italic">SECURED BY REVENGEE_SYSTEM</span>
                </div>
            `;
            feed.appendChild(card);
        });
    };

    // دالة التصويت لزيادة النقاط
    window.addKarma = (id) => {
        const item = issues.find(i => i.id === id);
        if (item) {
            item.karma += 10;
            renderFeed();
            console.log(`+10 XP granted to issue #${id}`);
        }
    };

    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('devName').value;
        const code = document.getElementById('rawCode').value;

        if (name && code) {
            const newIssue = {
                id: Math.floor(Math.random() * 10000),
                author: name.startsWith('@') ? name : '@' + name,
                code: code,
                karma: 10 // نقاط ترحيبية عند النشر
            };

            issues.unshift(newIssue);
            renderFeed();
            
            document.getElementById('devName').value = '';
            document.getElementById('rawCode').value = '';
        } else {
            alert("يرجى إدخال البيانات لإضافة كودك إلى الشبكة.");
        }
    });

    renderFeed();
});
