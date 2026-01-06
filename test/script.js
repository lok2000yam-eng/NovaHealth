// Case Studies Data (模擬未來的擴充性，這裡只放原始4個，但代碼支持無限多個)
const casesData = [
  {
    id: 1,
    category: "物理治療",
    case_name: "個案1: 中風康復與重拾自理",
    background:
      "72 歲的陳伯伯中風出院後，左側肢體無力，需長期臥床，家人對居家照顧感到旁徨，擔心長期臥床會導致更多併發症。",
    needs_analysis:
      "個案經理即時安排上門評估，發現陳伯伯因長期臥床導致關節僵硬，且家人缺乏正確的扶抱技巧，導致照顧者腰背受傷。",
    intervention:
      "物理治療師制定了為期三個月的「密集式家居康復計劃」，每週 3 次上門，結合功能性電學刺激 (FES) 與肌力訓練，並教導家屬省力轉移技巧。",
    user_quote:
      "心凝的治療師不只教運動，還教我們如何調整家居環境。看到先生能重新站起來，全家人的壓力都釋放了。",
    quote_author: "陳太太",
  },
  {
    id: 2,
    category: "護理服務",
    case_name: "個案2: 術後傷口管理與造口護理",
    background:
      "張女士接受大腸手術後出院，因造口護理不當導致皮膚潰爛，劇痛難忍，甚至因為滲漏問題而不敢睡覺。",
    needs_analysis:
      "個案經理接獲查詢後，1 小時內聯繫註冊護士，了解傷口滲漏情況並安排緊急到戶，評估周邊皮膚受損程度。",
    intervention:
      "護士採用先進的濕潤傷口癒合療法，每日上門更換敷料，並糾正張女士清洗造口的錯誤步驟，選擇合適的造口粉與保護膜。",
    user_quote:
      "原本因為造口而不敢出門，心凝的護士非常細心，專業的指導讓我找回了尊嚴和生活信心。",
    quote_author: "張女士",
  },
  {
    id: 3,
    category: "職業及言語治療",
    case_name: "個案3: 認知障礙與吞嚥安全",
    background:
      "85 歲的李婆婆患有中度認知障礙症，近期經常在進食時咳嗽，家屬擔心吸入性肺炎，且婆婆日夜顛倒情況嚴重。",
    needs_analysis:
      "個案經理協調言語治療師及職業治療師共同評估。發現婆婆有吞嚥障礙，且居家環境雜亂導致她情緒易焦慮。",
    intervention:
      "言語治療師調整食物稠度及教導吞嚥技巧；職業治療師則引入「懷緬治療」並優化家居環境標示，建立規律作息表。",
    user_quote:
      "心凝的團隊很專業，讓我們知道如何透過小細節改善媽媽的生活品質，真的很貼心。",
    quote_author: "李婆婆家屬",
  },
  {
    id: 4,
    category: "陪診及其他",
    case_name: "個案4: 慢性疾病管理與醫療協調",
    background:
      "獨居的林先生患有三高及糖尿病，經常漏服藥物，且對於去醫院覆診感到困惑恐懼，各專科覆診時間經常混淆。",
    needs_analysis:
      "個案經理為林先生制定長期健康管理方案，安排專業陪診員與護士定期隨訪，整合不同專科的覆診日程。",
    intervention:
      "陪診員全程記錄醫生醫囑，並由護士每週上門整理「藥盒管理」及監測血糖血壓，將數據即時回報給家屬。",
    user_quote:
      "現在有人陪我去醫院，在家也有護士幫我對藥，我再也不擔心吃錯藥了，心凝就像我的家人一樣。",
    quote_author: "林先生",
  },
  // 這裡可以繼續添加更多案例...
];

document.addEventListener("DOMContentLoaded", () => {
  const navList = document.getElementById("navList");

  // UI Elements
  const elCategory = document.getElementById("caseCategory");
  const elTitle = document.getElementById("caseTitle");
  const elBackground = document.getElementById("caseBackground");
  const elNeeds = document.getElementById("caseNeeds");
  const elIntervention = document.getElementById("caseIntervention");
  const elQuote = document.getElementById("caseQuote");
  const elAuthor = document.getElementById("caseAuthor");
  const cardContent = document.querySelector(".card-content");

  let currentId = casesData[0].id;

  // 1. Render Navigation List (Scalable)
  function renderNavigation() {
    navList.innerHTML = "";
    casesData.forEach((item) => {
      const div = document.createElement("div");
      div.className = `nav-item ${item.id === currentId ? "active" : ""}`;
      div.onclick = () => loadCase(item.id);

      div.innerHTML = `
                <span class="nav-cat">${item.category}</span>
                <div class="nav-title">${item.case_name}</div>
            `;
      navList.appendChild(div);
    });
  }

  // 2. Load Case Details with Animation
  function loadCase(id) {
    if (id === currentId && !event.isTrusted) return; // Prevent reload if same, unless forced
    currentId = id;

    // Update Nav Active State
    const items = document.querySelectorAll(".nav-item");
    items.forEach((item, index) => {
      if (casesData[index].id === id) {
        item.classList.add("active");
        // Ensure the active item is visible in scroll view
        item.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        item.classList.remove("active");
      }
    });

    // Trigger Exit Animation
    cardContent.style.opacity = "0";
    cardContent.style.transform = "translateY(10px)";

    setTimeout(() => {
      const data = casesData.find((c) => c.id === id);

      // Update Text
      elCategory.textContent = data.category;
      elTitle.textContent = data.case_name;
      elBackground.textContent = data.background;
      elNeeds.textContent = data.needs_analysis;
      elIntervention.textContent = data.intervention;
      elQuote.textContent = data.user_quote;
      elAuthor.textContent = `- ${data.quote_author}`;

      // Trigger Enter Animation
      cardContent.classList.remove("fade-enter");
      void cardContent.offsetWidth; // Trigger reflow
      cardContent.classList.add("fade-enter");

      cardContent.style.opacity = "1";
      cardContent.style.transform = "translateY(0)";
    }, 200);
  }

  // 3. 3D Tilt Effect logic
  const card = document.getElementById("detailCard");
  const container = document.querySelector(".content-area");

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Very subtle tilt
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;

    card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener("mouseleave", () => {
    card.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg)`;
  });

  // Initialize
  renderNavigation();
  // Pre-load first case without animation delay
  const firstData = casesData[0];
  elCategory.textContent = firstData.category;
  elTitle.textContent = firstData.case_name;
  elBackground.textContent = firstData.background;
  elNeeds.textContent = firstData.needs_analysis;
  elIntervention.textContent = firstData.intervention;
  elQuote.textContent = firstData.user_quote;
  elAuthor.textContent = `- ${firstData.quote_author}`;
});
