type AiResult = { summary: string; source: 'openai' | 'demo' };

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function demoSummary(title: string): string {
  const intros = [
    'Bu yazı, konuya hızlı bir giriş yapar ve temel kavramları netleştirir.',
    'Bu içerikte, en kritik noktaları sade bir dille toparlayıp pratik örneklerle destekleriz.',
    'Bu yazı, öğrenmeyi hızlandıran kısa ipuçları ve uygulanabilir adımlar sunar.'
  ];

  const middles = [
    'Okuyucuya “ne, neden, nasıl” çerçevesinde düzenli bir akış sağlar.',
    'Kısa checklist ve best-practice önerileriyle daha profesyonel bir yaklaşım kazandırır.',
    'Sık yapılan hataları da işaret ederek doğru yönlendirme yapar.'
  ];

  const endings = [
    'Sonunda, portfolyo/LinkedIn’de paylaşılabilir bir çıktı hedeflenir.',
    'Özetle, hem öğrenme hem üretim tarafını aynı anda ileri taşır.',
    'Son bölümde, bir mini uygulama fikriyle öğrendiklerini pekiştirirsin.'
  ];

  return `Kısa özet: "${title}" — ${pick(intros)} ${pick(middles)} ${pick(endings)}`;
}

export async function generateSummaryFromTitle(title: string): Promise<AiResult> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // Key yoksa direkt demo
  if (!apiKey) {
    return { summary: demoSummary(title), source: 'demo' };
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Türkçe, maksimum 3 cümlelik profesyonel blog özeti yaz.' },
        { role: 'user', content: `"${title}" başlığı için blog özeti yaz.` },
      ],
      max_tokens: 170,
      temperature: 0.7,
    }),
  });

  // Quota yoksa demo
  if (res.status === 429) {
    return { summary: demoSummary(title), source: 'demo' };
  }

  const text = await res.text();
  if (!res.ok) {
    // başka hata: yine demo üret ama source demo
    return { summary: demoSummary(title), source: 'demo' };
  }

  const data = JSON.parse(text);
  const content = (data?.choices?.[0]?.message?.content ?? '').trim();

  return { summary: content || demoSummary(title), source: 'openai' };
}
