import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Loader2, Copy, Check, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCustomerType, CustomerType } from "@/context/CustomerTypeContext";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

const ctaContent: Record<CustomerType, string> = {
  boxer: "Join the Waitlist",
  coach: "Request Demo",
  promoter: "Partner With Us",
  fan: "Get Early Access",
};

interface CTASectionProps {
  referredBy?: string;
}

const CTASection = ({ referredBy = "" }: CTASectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { customerType } = useCustomerType();
  const ctaText = ctaContent[customerType];

  const referralLink = referralCode
    ? `${window.location.origin}/?ref=${referralCode}`
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase
      .from("waitlist_signups")
      .insert({
        email: email.trim(),
        customer_type: customerType,
        ...(referredBy ? { referred_by: referredBy } : {}),
      });

    if (error) {
      setIsSubmitting(false);
      const isDuplicate = error.code === "23505";
      toast({
        title: isDuplicate ? "Already signed up!" : "Something went wrong",
        description: isDuplicate
          ? "This email is already on the waitlist."
          : "Please try again in a moment.",
        variant: isDuplicate ? "default" : "destructive",
      });
      return;
    }

    // Fetch the referral code for the newly created signup
    const { data } = await supabase
      .from("waitlist_signups")
      .select("referral_code, referral_count")
      .eq("email", email.trim())
      .single();

    setIsSubmitting(false);

    if (data) {
      setReferralCode(data.referral_code);
      setReferralCount(data.referral_count);
    }

    setIsSubmitted(true);
    setEmail("");

    toast({
      title: "You're on the list!",
      description: "We'll notify you when PEAK launches.",
    });
  };

  const progressPercent = Math.min((referralCount / 3) * 100, 100);
  const rewardEarned = referralCount >= 3;

  return (
    <section id="cta" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Limited Early Access
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6"
          >
            Ready to <span className="text-gradient-red">Elevate</span> Your Game?
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
          >
            Join the waitlist and be the first to experience elite-level training technology.
          </motion.p>

          {/* Email Form / Post-signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto space-y-6"
              >
                {/* Success message */}
                <div className="flex items-center justify-center gap-3 p-6 glass-card">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span className="font-medium">You're on the list! We'll be in touch.</span>
                </div>

                {/* Referral section */}
                {referralCode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 space-y-4"
                  >
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-primary">
                      <Gift className="w-4 h-4" />
                      Refer 3 Friends — Unlock Exclusive Rewards
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{referralCount}/3 friends referred</span>
                        {rewardEarned && (
                          <span className="text-primary font-medium">🎉 Reward earned!</span>
                        )}
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    {/* Referral link */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Share your unique link:</p>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={referralLink}
                          className="h-10 bg-secondary border-border text-foreground text-xs flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="h-10 px-3 border-border"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary flex-1"
                  disabled={isSubmitting}
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={customerType}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold glow-red whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          {ctaText}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </form>
            )}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Exclusive launch pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>Early access to features</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
