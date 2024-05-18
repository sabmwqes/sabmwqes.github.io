window.onload = function() { // h1を読み込むまで待つ
    
    const letters = "ABCDEFGHIJKLMNOPWQRSTUVWXYZ";

    const objects = document.querySelectorAll("h1");
    
    let intervals = Array(objects.length).fill(null);
    
    const stringScrumble = (target, index) => {
        let iteration = 0;

        // clearInterval(intervals[index]);

        intervals[index] = setInterval(() => {
            target.innerText = target.innerText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                return target.dataset.value[index];
                }
            
                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");
            
            if(iteration >= target.dataset.value.length){
                clearInterval(intervals);
            }
            
            iteration += 1 / 2; //文字列が確定していく速さ
            }, 30); //スクランブル間隔30ms
    }


    //スクロール感知で実行
    const cb = function(entries, observer) {
        entries.forEach((entry, index) => {
            if(entry.isIntersecting) {
                stringScrumble(entry.target, index); //文字列スクランブル
                observer.unobserve(entry.target); //監視の終了
            }
        });
    }
    // オプション
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    }
    // IntersectionObserverインスタンス化
    const io = new IntersectionObserver(cb, options);
    // 監視を開始
    objects.forEach(object => {
        io.observe(object);
    });

    // DISCLAIMER: DON'T ASK ME ABOUT THIS CODE.
}
