// import { useState, useCallback } from 'react';
// import { fetchProximaAula, type ProximaAulaApi } from '../../services/aula/fetchProximaAula';
// import Botao from '../../components/Botao/Botao';
// import { confirmarAula, desmarcarAula } from "../../services/aula/confirmCancelAula"

// interface Feedback {
//     message: string;
//     type: 'success' | 'error';
// }

// interface ModalProps {
//     isVisible: boolean;
//     title: string;
//     message: string;
//     onConfirm: () => void;
//     onCancel: () => void;
//     confirmText: string;
// }

// const formatarDataExibicao = (data: string, horario: string) => `${data} às ${horario}`;

// const SimpleModal = ({ isVisible, title, message, onConfirm, onCancel, confirmText }: ModalProps) => {
//     if (!isVisible) return null;

//     const isConfirmModal = title.includes("Confirmar");
//     const confirmHoverStyle = isConfirmModal
//         ? "hover:bg-[var(--azul-segundario)]"
//         : "hover:bg-red-600";
    
//     const confirmBaseStyle = "bg-[var(--destaque)]";

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center"
//             style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
//         >
//             <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-auto">
//                 <h3 className="">{title}</h3>
//                 <p className="mb-6">{message}</p>
//                 <div className="flex justify-end gap-3">
//                     <button
//                         onClick={onCancel}
//                         className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
//                     >
//                         Cancelar
//                     </button>
//                     <button
//                         onClick={onConfirm}
//                         className={`px-4 py-2 text-white rounded-md transition ${confirmBaseStyle} ${confirmHoverStyle}`}
//                     >
//                         {confirmText}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// interface ProximaAulaProps {
//     user_id?: number | null;
// }

// export default function Proxima{ user_id }: ProximaAulaProps) {
//     const [proximaAula, setProximaAula] = useState<ProximaAulaApi | null | undefined>(null);
//     const [loading, setLoading] = useState(true);
//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [showCancelModal, setShowCancelModal] = useState(false);
//     const [feedbackMessage, setFeedbackMessage] = useState<Feedback | null>(null);
//     const [aulaConfirmada, setAulaConfirmada] = useState(false);


//     useState(() => {
//         const carregarProximaAula = async () => {
//             if (!user_id) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 setLoading(true);
//                 const aula = await fetchProximaAula(user_id.toString());
//                 setProximaAula(aula);
//             } catch (error) {
//                 console.error('Erro ao carregar próxima aula:', error);
//                 setProximaAula(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         carregarProximaAula();
//     });

//     const displayFeedback = useCallback((message: string, type: 'success' | 'error') => {
//         setFeedbackMessage({ message, type });
//         setTimeout(() => setFeedbackMessage(null), 4000);
//     }, []);

//     const confirmClass = useCallback(async () => {
//         if (!proximaAula || !user_id) return;

//         try {
//             await confirmarAula(proximaAula.id, user_id);
//             setAulaConfirmada(true);
//             displayFeedback("Sua aula foi confirmada! ✅", 'success');
//         } catch (error) {
//             console.error(error);
//             displayFeedback("Erro ao confirmar a aula. ❌", 'error');
//         } finally {
//             setShowConfirmModal(false);
//         }
//     }, [proximaAula, user_id, displayFeedback]);

//     const cancelClass = useCallback(async () => {
//         if (!proximaAula || !user_id) return;

//         try {
//             await desmarcarAula(proximaAula.id, user_id);
//             setProximaAula(null);
//             setAulaConfirmada(false);
//             displayFeedback("Sua aula foi cancelada. ❌", 'error');
//         } catch (error) {
//             console.error(error);
//             displayFeedback("Erro ao cancelar a aula. ❌", 'error');
//         } finally {
//             setShowCancelModal(false);
//         }
//     }, [proximaAula, user_id, displayFeedback]);

//     if (loading) return <p>Carregando dados da próxima aula...</p>;

//     return (
//         <div>
//             {feedbackMessage && (
//                 <div className={`p-4 mb-4 rounded-lg ${
//                     feedbackMessage.type === 'success' 
//                         ? 'bg-green-100 text-green-700' 
//                         : 'bg-red-100 text-red-700'
//                 }`}>
//                     {feedbackMessage.message}
//                 </div>
//             )}

//             {proximaAula ? (
//                 <div>
//                     <h2>{`Sua próxima aula (${proximaAula.tipo})`}</h2>
//                     <p>{`Em ${formatarDataExibicao(proximaAula.data, proximaAula.horario)} (${proximaAula.unidade.name})`}</p>
//                     {!aulaConfirmada ? (
//                         <>
//                             <Botao 
//                                 texto="Confirmar" 
//                                 type="button" 
//                                 onClick={() => setShowConfirmModal(true)} 
//                             />
//                             <Botao 
//                                 texto="Desmarcar" 
//                                 type="button" 
//                                 onClick={() => setShowCancelModal(true)} 
//                             />
//                         </>
//                     ) : (
//                         <>
//                             <p>Sua aula está confirmada! ✅</p>
//                             <Botao 
//                                 texto="Desmarcar" 
//                                 type="button" 
//                                 onClick={() => setShowCancelModal(true)} 
//                             />
//                         </>
//                     )}
//                 </div>
//             ) : (
//                 <p>Nenhuma aula futura agendada.</p>
//             )}

//             <SimpleModal
//                 isVisible={showConfirmModal && !!proximaAula}
//                 title="Confirmar Aula"
//                 message={`Deseja confirmar sua aula em ${proximaAula ? formatarDataExibicao(proximaAula.data, proximaAula.horario) : ''}?`}
//                 onConfirm={confirmClass}
//                 onCancel={() => setShowConfirmModal(false)}
//                 confirmText="Sim, Confirmar"
//             />

//             <SimpleModal
//                 isVisible={showCancelModal && !!proximaAula}
//                 title="Desmarcar Aula"
//                 message={`Deseja desmarcar sua aula em ${proximaAula ? formatarDataExibicao(proximaAula.data, proximaAula.horario) : ''}?`}
//                 onConfirm={cancelClass}
//                 onCancel={() => setShowCancelModal(false)}
//                 confirmText="Sim, Desmarcar"
//             />
//         </div>
//     );
// }