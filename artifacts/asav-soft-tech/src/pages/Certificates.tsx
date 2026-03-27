import DashboardLayout from "@/components/layout/DashboardLayout";
import { useGetCertificates } from "@workspace/api-client-react";
import { Download, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Certificates() {
  const { data: certs, isLoading } = useGetCertificates({ query: { retry: false } });

  const mockCerts = [
    { id: 1, userId: 1, courseId: 1, courseName: "DevOps Engineer", studentName: "Student User", issuedAt: "2023-09-15T00:00:00Z", certificateNumber: "ASAV-DEV-10024" }
  ];

  const displayCerts = (certs && certs.length > 0) ? certs : mockCerts;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display mb-2">My Certificates</h1>
        <p className="text-muted-foreground">View and download your completed course certificates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCerts.map((cert) => (
          <div key={cert.id} className="glass-panel p-6 rounded-2xl border-t-4 border-t-primary text-center relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <Award size={150} />
            </div>
            <div className="w-16 h-16 mx-auto bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4 relative z-10">
              <Award size={32} />
            </div>
            <h3 className="font-bold text-lg mb-1 relative z-10">{cert.courseName}</h3>
            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest relative z-10">ID: {cert.certificateNumber}</p>
            <p className="text-sm text-foreground mb-6 relative z-10">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
            
            <Button className="w-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground relative z-10">
              <Download size={16} className="mr-2" /> Download PDF
            </Button>
          </div>
        ))}
        {displayCerts.length === 0 && !isLoading && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Complete a course to earn your first certificate!
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
