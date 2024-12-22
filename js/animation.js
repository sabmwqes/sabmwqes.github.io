window.onload = function() { // DOM読み込むまで待つ
    
    const letters = "ABCDEFGHKMNOPRSTXZ";

    const titles = document.querySelectorAll(".srcumble-text");
    
    let intervals = Array(titles.length).fill(null);
    let iterations = Array(titles.length).fill(0);

    const stringScrumble = (target, index) => {
        target.iteration = 0; // js object magic
        target.interval = setInterval(() => {
            target.innerText = target.innerText
            .split("")
            .map((letter, i) => {
                if(i < target.iteration) return target.dataset.value[i];
                return letters[Math.floor(Math.random() * letters.length)]
            })
            .join("");
            
            if(target.iteration >= target.dataset.value.length){
                clearInterval(target.interval);
            }
            
            target.iteration += 1 / 5; //文字列が確定していく速さ
            console.log(`iteration: ${target.iteration}, length: ${target.dataset.value.length}`);
            }, 30); //スクランブル間隔(ms)
    }


    //スクロール感知で実行
    const callback = function(entries, observer) {
        entries.forEach((entry, index) => {
        // console.log(`index: ${index}`);
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
    const observer = new IntersectionObserver(callback, options);
    // 監視を開始
    titles.forEach(title => {
        observer.observe(title);
    });

    // DISCLAIMER: DON'T ASK ME ABOUT THIS CODE.
}
