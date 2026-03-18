const interpretationTable = [
  {
    metric1: "Upheld%",
    metric1Band: "Low",
    metric2: "FOS cases per 1m",
    metric2Band: "High",
    interpretation: "Customers disagree with internal decisions; possible fairness or communication issues",
    considerations: "Review decision quality; assess clarity of final response letters; compare internal decisions with FOS outcomes",
    cw: "Agree with reviewing the outcomes to see what can be learned about communication and understanding to prevent referral"
  },
  {
    metric1: "Upheld%",
    metric1Band: "High",
    metric2: "FOS cases per 1m",
    metric2Band: "High",
    interpretation: "Customers raise valid issues and escalate; systemic issues likely",
    considerations: "Root-cause analysis; fix recurring issues; strengthen early resolution",
    cw: ""
  },
  {
    metric1: "Upheld%",
    metric1Band: "Low",
    metric2: "FOS cases per 1m",
    metric2Band: "Low",
    interpretation: "Strong internal decision-making and low escalation",
    considerations: "Maintain controls; check for under-reporting or barriers to escalation",
    cw: "Good point on identifying and recording complaints"
  },
  {
    metric1: "Upheld%",
    metric1Band: "High",
    metric2: "FOS cases per 1m",
    metric2Band: "Low",
    interpretation: "Firm accepts fault internally; customers satisfied with resolution",
    considerations: "Ensure upheld themes are addressed; monitor for systemic issues",
    cw: ""
  },
  {
    metric1: "Upheld%",
    metric1Band: "High",
    metric2: "Complaints per 1000",
    metric2Band: "High",
    interpretation: "Many complaints and firm agrees with customers → systemic failures",
    considerations: "Prioritise fixes; review product design; strengthen QA",
    cw: "Agree with most of it – not sure why strengthen QA would be a focus area unless an internal review and comparison to FOS decisions suggests they are upholding unnecessarily"
  },
  {
    metric1: "Upheld%",
    metric1Band: "High",
    metric2: "Complaints per 1000",
    metric2Band: "Low",
    interpretation: "Few complaints but many upheld → issues affecting small groups or barriers to complaining",
    considerations: "Review accessibility; check frontline recognition of complaints",
    cw: "I like these points"
  },
  {
    metric1: "Upheld%",
    metric1Band: "Low",
    metric2: "Complaints per 1000",
    metric2Band: "High",
    interpretation: "Customers unhappy but firm believes it is not at fault → expectation or communication issues",
    considerations: "Improve clarity of terms; review onboarding; analyse themes",
    cw: "Would only do this once they have compared to FOS uphold rate and external factors such as media coverage, CMC activity etc"
  },
  {
    metric1: "Upheld%",
    metric1Band: "Low",
    metric2: "Complaints per 1000",
    metric2Band: "Low",
    interpretation: "Low complaints and low upheld → stable performance",
    considerations: "Monitor for emerging issues; ensure no under-reporting",
    cw: ""
  },
  {
    metric1: "Upheld%",
    metric1Band: "Low",
    metric2: "FOS Upheld%",
    metric2Band: "High",
    interpretation: "FOS disagrees with firm → fairness or judgement issues",
    considerations: "Review decision frameworks; align with FOS guidance; strengthen QA",
    cw: "Again, I think strengthen QA should only come into play once the other factors have been established."
  },
  {
    metric1: "Upheld%",
    metric1Band: "High",
    metric2: "FOS Upheld%",
    metric2Band: "Low",
    interpretation: "Firm upholds many cases but FOS disagrees → possible over-correction internally",
    considerations: "Review consistency; ensure decisions are evidence-based",
    cw: "Not sure I agree that the firm is over-correcting…"
  },
  {
    metric1: "Upheld%",
    metric1Band: "Low",
    metric2: "FOS Upheld%",
    metric2Band: "Low",
    interpretation: "Firm and FOS both reject most cases → strong alignment",
    considerations: "Maintain controls; check for customer misunderstanding",
    cw: "Could suggest poor customer understanding…"
  },
  {
    metric1: "Upheld%",
    metric1Band: "High",
    metric2: "FOS Upheld%",
    metric2Band: "High",
    interpretation: "Both agree many cases are valid → systemic issues",
    considerations: "Fix root causes; review product/service design",
    cw: ""
  },
  {
    metric1: "Closed 8 weeks+%",
    metric1Band: "High",
    metric2: "FOS cases per 1m",
    metric2Band: "High",
    interpretation: "Customers escalate due to delays",
    considerations: "Review resourcing; improve triage; introduce early resolution",
    cw: ""
  },
  {
    metric1: "Closed 8 weeks+%",
    metric1Band: "High",
    metric2: "FOS cases per 1m",
    metric2Band: "Low",
    interpretation: "Slow responses but customers accept outcomes",
    considerations: "Improve timeliness; check for hidden dissatisfaction",
    cw: ""
  },
  {
    metric1: "Closed 8 weeks+%",
    metric1Band: "Low",
    metric2: "FOS cases per 1m",
    metric2Band: "High",
    interpretation: "Timely responses but high escalation → customers unhappy with decisions",
    considerations: "Review decision quality; improve communication",
    cw: ""
  },
  {
    metric1: "Closed 8 weeks+%",
    metric1Band: "Low",
    metric2: "FOS cases per 1m",
    metric2Band: "Low",
    interpretation: "Efficient and effective complaint handling",
    considerations: "Maintain processes; monitor for emerging risks",
    cw: ""
  }
];