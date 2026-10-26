
"use client";

import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Minus,
  Plus,
} from "lucide-react";

const WHATSAPP_NUMBER = "5531971267546";

const CONVERSATION_MESSAGE =
  "Olá! Vim pelo site da BBC Corporation e gostaria de conhecer melhor a empresa, saber mais sobre as oportunidades e entender como podemos conversar.";

const CONVERSATION_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  CONVERSATION_MESSAGE
)}`;

const perguntas = [
  {
    pergunta: "O que é a BBC Corporation?",
    resposta:
      "A BBC Corporation tem como proposta aproximar pessoas, empresas e oportunidades, valorizando conexões que possam abrir novos caminhos.",
  },
  {
    pergunta: "Como posso apresentar uma oportunidade de negócio?",
    resposta:
      "Preencha o formulário ao lado, selecione o assunto mais adequado e conte um pouco sobre sua proposta. Você poderá encaminhar essas informações diretamente pelo WhatsApp.",
  },
  {
    pergunta: "A BBC Corporation recebe propostas de parceria?",
    resposta:
      "Você pode apresentar uma proposta de parceria utilizando nosso formulário de contato. Assim, a equipe poderá conhecer sua ideia.",
  },
  {
    pergunta: "Como funciona o primeiro contato?",
    resposta:
      "Após preencher o formulário, você será direcionado ao WhatsApp com uma mensagem preparada. Basta confirmar o envio para iniciar a conversa.",
  },
  {
    pergunta: "Quando receberei uma resposta?",
    resposta:
      "Após o envio da mensagem pelo WhatsApp, a equipe poderá analisar seu contato e responder conforme a disponibilidade.",
  },
];

type FormData = {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
};

const initialForm: FormData = {
  nome: "",
  email: "",
  telefone: "",
  assunto: "",
  mensagem: "",
};

const inputClass =
  "w-full rounded-xl border border-[#DDE2DE] bg-white/80 px-4 py-3.5 text-[14px] text-[#1A252B] outline-none transition-colors duration-200 placeholder:text-[#A0AAA5] focus:border-[#617D80] focus:ring-2 focus:ring-[#617D80]/10";

// Máscara automática para telefone brasileiro
const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (!numbers) return "";

  if (numbers.length <= 2) {
    return `(${numbers}`;
  }

  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

// Normalização do e-mail sem restringir caracteres válidos
const formatEmail = (value: string) => {
  return value.replace(/\s/g, "").toLowerCase();
};

export default function ContactFAQ() {
  const reducedMotion = useReducedMotion();

  const [form, setForm] = useState<FormData>(initialForm);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [prepared, setPrepared] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    let formattedValue = value;

    if (field === "telefone") {
      formattedValue = formatPhone(value);
    }

    if (field === "email") {
      formattedValue = formatEmail(value);
    }

    setForm((previous) => ({
      ...previous,
      [field]: formattedValue,
    }));

    setError("");
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!WHATSAPP_NUMBER.trim()) {
      setError(
        "O número de WhatsApp da BBC ainda precisa ser configurado."
      );
      return;
    }

    const number = WHATSAPP_NUMBER.replace(/\D/g, "");

    if (!/^\d{10,15}$/.test(number)) {
      setError(
        "O número de WhatsApp configurado é inválido."
      );
      return;
    }

    if (!form.nome.trim()) {
      setError("Informe seu nome para continuar.");
      return;
    }

    const phoneDigits = form.telefone.replace(/\D/g, "");

    if (
      phoneDigits.length !== 10 &&
      phoneDigits.length !== 11
    ) {
      setError(
        "Informe um WhatsApp válido com DDD."
      );
      return;
    }

    const mensagem = [
      "Olá, BBC Corporation!",
      "",
      "Gostaria de entrar em contato.",
      "",
      `*Nome:* ${form.nome.trim()}`,
      ...(form.email.trim()
        ? [`*E-mail:* ${form.email.trim()}`]
        : []),
      `*WhatsApp:* ${form.telefone.trim()}`,
      `*Assunto:* ${form.assunto}`,
      "",
      "*Mensagem:*",
      form.mensagem.trim(),
    ].join("\n");

    const url = `https://wa.me/${number}?text=${encodeURIComponent(
      mensagem
    )}`;

    // Abre o WhatsApp a partir do clique do visitante.
    const whatsappWindow = window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );

    if (!whatsappWindow) {
      // Caso o navegador bloqueie a nova aba.
      window.location.assign(url);
      return;
    }

    // Indica que a mensagem foi preparada, não enviada.
    setPrepared(true);
  };

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="relative overflow-hidden bg-[#F7F7F4] py-24 text-[#17232A] md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-16">
        {/* Introdução */}
        <motion.div
          initial={
            reducedMotion
              ? false
              : { opacity: 0, y: 24 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 max-w-[780px] md:mb-16"
        >
          <h2
            id="contact-title"
            className="text-[clamp(2.5rem,4.5vw,5rem)] font-medium leading-[1.08] tracking-[-0.065em]"
          >
            Vamos transformar uma conversa
            <span className="block text-[#899793]">
              em novas possibilidades.
            </span>
          </h2>

          <p className="mt-6 max-w-[570px] text-[15px] leading-[1.8] text-[#687672] md:text-base">
            Compartilhe sua ideia, apresente uma oportunidade
            ou tire suas dúvidas. O primeiro passo começa aqui.
          </p>
        </motion.div>

        {/* Colunas simétricas */}
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          {/* FORMULÁRIO */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 35 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex h-full flex-col rounded-[28px] border border-[#E0E5E0] bg-white p-6 shadow-[0_12px_55px_rgba(30,45,40,0.035)] sm:p-8 xl:p-10"
          >
            <AnimatePresence mode="wait">
              {prepared ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  role="status"
                  className="flex flex-1 flex-col items-start justify-center py-10"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8F0EB] text-[#406B56]">
                    <CheckCircle2
                      size={30}
                      strokeWidth={1.5}
                    />
                  </span>

                  <h3 className="mt-8 text-3xl font-medium tracking-[-0.05em]">
                    Obrigado pelo contato!
                  </h3>

                  <p className="mt-4 max-w-[420px] text-[15px] leading-[1.9] text-[#687672]">
                    Sua mensagem foi preparada e o WhatsApp
                    foi aberto. Confirme o envio por lá para
                    que a equipe da BBC Corporation receba
                    suas informações e possa responder assim
                    que possível.
                  </p>

                  <button
                    type="button"
                    onClick={() => setPrepared(false)}
                    className="mt-9 inline-flex items-center gap-3 text-sm font-medium text-[#17232A] transition-opacity hover:opacity-60"
                  >
                    Voltar ao formulário
                    <ArrowRight size={17} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-1 flex-col"
                >
                  <div className="mb-8">
                    <h3 className="text-2xl font-medium tracking-[-0.045em]">
                      Entre em contato.
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#7A8781]">
                      Preencha os campos abaixo para iniciar
                      sua conversa.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-1 flex-col gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      {/* NOME OBRIGATÓRIO */}
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-2 block text-[13px] font-medium"
                        >
                          Nome completo
                        </label>

                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          required
                          maxLength={120}
                          value={form.nome}
                          onChange={(e) =>
                            updateField(
                              "nome",
                              e.target.value
                            )
                          }
                          placeholder="Seu nome"
                          className={inputClass}
                        />
                      </div>

                      {/* WHATSAPP OBRIGATÓRIO COM MÁSCARA */}
                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="mb-2 block text-[13px] font-medium"
                        >
                          WhatsApp
                        </label>

                        <input
                          id="contact-phone"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          required
                          maxLength={15}
                          pattern="\(\d{2}\) \d{4,5}-\d{4}"
                          title="Informe um telefone com DDD."
                          value={form.telefone}
                          onChange={(e) =>
                            updateField(
                              "telefone",
                              e.target.value
                            )
                          }
                          placeholder="(00) 00000-0000"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* E-MAIL OPCIONAL */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-[13px] font-medium"
                      >
                        E-mail
                        <span className="ml-2 font-normal text-[#8C9792]">
                          (opcional)
                        </span>
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        maxLength={160}
                        value={form.email}
                        onChange={(e) =>
                          updateField(
                            "email",
                            e.target.value
                          )
                        }
                        placeholder="seuemail@exemplo.com"
                        className={inputClass}
                      />
                    </div>

                    {/* ASSUNTO */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="mb-2 block text-[13px] font-medium"
                      >
                        Assunto
                      </label>

                      <select
                        id="contact-subject"
                        required
                        value={form.assunto}
                        onChange={(e) =>
                          updateField(
                            "assunto",
                            e.target.value
                          )
                        }
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Selecione um assunto
                        </option>

                        <option value="Oportunidade de negócio">
                          Oportunidade de negócio
                        </option>

                        <option value="Proposta de parceria">
                          Proposta de parceria
                        </option>

                        <option value="Contato institucional">
                          Contato institucional
                        </option>

                        <option value="Outro assunto">
                          Outro assunto
                        </option>
                      </select>
                    </div>

                    {/* MENSAGEM SEM MÍNIMO DE CARACTERES */}
                    <div className="flex flex-1 flex-col">
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block text-[13px] font-medium"
                      >
                        Sua mensagem
                      </label>

                      <textarea
                        id="contact-message"
                        required
                        maxLength={2000}
                        value={form.mensagem}
                        onChange={(e) =>
                          updateField(
                            "mensagem",
                            e.target.value
                          )
                        }
                        placeholder="Conte um pouco sobre sua ideia ou oportunidade..."
                        rows={5}
                        className={`${inputClass} min-h-[145px] flex-1 resize-y`}
                      />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="text-sm text-red-600"
                      >
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="group mt-2 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#17232A] px-6 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#30444B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#17232A]"
                    >
                      Enviar pelo WhatsApp

                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.6}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </button>

                    <p className="text-center text-xs leading-relaxed text-[#8C9792]">
                      Você será direcionado ao WhatsApp para
                      confirmar o envio da mensagem.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 35 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex h-full flex-col rounded-[28px] border border-[#E0E5E0] bg-[#EEF0EC] p-6 sm:p-8 xl:p-10"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-medium tracking-[-0.045em]">
                Perguntas frequentes.
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#7A8781]">
                Algumas respostas para ajudar você a
                dar o próximo passo.
              </p>
            </div>

            <div className="border-t border-[#D1D8D2]">
              {perguntas.map((item, index) => {
                const isOpen = activeFaq === index;
                const answerId = `faq-answer-${index}`;
                const questionId = `faq-question-${index}`;

                return (
                  <div
                    key={item.pergunta}
                    className="border-b border-[#D1D8D2]"
                  >
                    <button
                      id={questionId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() =>
                        setActiveFaq(
                          isOpen ? null : index
                        )
                      }
                      className="flex w-full items-center justify-between gap-5 py-5 text-left"
                    >
                      <span className="text-[15px] font-medium leading-snug tracking-[-0.02em] text-[#25332F]">
                        {item.pergunta}
                      </span>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#C9D1CA] text-[#66776E]">
                        {isOpen ? (
                          <Minus
                            size={15}
                            strokeWidth={1.6}
                          />
                        ) : (
                          <Plus
                            size={15}
                            strokeWidth={1.6}
                          />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          id={answerId}
                          role="region"
                          aria-labelledby={questionId}
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: reducedMotion
                              ? 0
                              : 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[470px] pb-6 pr-9 text-sm leading-[1.85] text-[#75827A]">
                            {item.resposta}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Preenche o espaço inferior da coluna */}
            <div className="mt-auto pt-10">
              <div className="relative overflow-hidden rounded-[22px] bg-[#1B2B30] p-7 text-white sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#638B8B]/20 blur-[55px]"
                />

                <MessageCircle
                  size={25}
                  strokeWidth={1.3}
                  className="relative text-[#BDD1CA]"
                />

                <p className="relative mt-5 max-w-[340px] text-[clamp(1.35rem,2vw,1.8rem)] font-medium leading-[1.25] tracking-[-0.045em]">
                  Toda grande oportunidade começa com uma
                  conversa.
                </p>

                <p className="relative mt-3 max-w-[330px] text-sm leading-[1.75] text-white/60">
                  Sua próxima conexão pode começar agora.
                  Compartilhe sua ideia com a BBC.
                </p>

                <a
                  href={CONVERSATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-opacity hover:opacity-70"
                >
                  Iniciar conversa

                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                  />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
