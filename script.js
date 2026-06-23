const formatter = new Intl.NumberFormat("ja-JP");
const toast = document.querySelector(".toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll("[data-scroll-return]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#returns").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelector(".favorite").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const active = button.getAttribute("aria-pressed") === "true";
  const count = document.querySelector("#favoriteCount");
  button.setAttribute("aria-pressed", String(!active));
  button.classList.toggle("active", !active);
  button.querySelector("span").textContent = active ? "♡" : "♥";
  count.textContent = Number(count.textContent) + (active ? -1 : 1);
  showToast(active ? "気になるリストから外しました" : "気になるリストに追加しました");
});

document.querySelector(".share").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    showToast("シミュレーションページのURLをコピーしました");
  } catch {
    showToast("このプロジェクトをシェアして応援できます");
  }
});

document.querySelectorAll(".support-button").forEach((button) => {
  button.addEventListener("click", () => {
    const stock = document.querySelector(`#${button.dataset.stock}`);
    const currentStock = Number(stock.textContent);
    if (currentStock <= 0) return showToast("このリターンは完売しました");

    const amount = document.querySelector("#totalAmount");
    const supporters = document.querySelector("#supporters");
    const nextAmount = Number(amount.textContent.replaceAll(",", "")) + Number(button.dataset.return);
    amount.textContent = formatter.format(nextAmount);
    supporters.textContent = Number(supporters.textContent) + 1;
    stock.textContent = currentStock - 1;
    showToast("応援購入をシミュレーションしました（実際の決済はありません）");
  });
});

const observedSections = ["story", "reports", "comments"];
const tabs = [...document.querySelectorAll(".project-tabs a")];
const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  tabs.forEach((tab) => tab.classList.toggle("active", tab.getAttribute("href") === `#${visible.target.id}`));
}, { rootMargin: "-30% 0px -55%", threshold: [0, 0.2, 0.5] });

observedSections.forEach((id) => observer.observe(document.querySelector(`#${id}`)));
