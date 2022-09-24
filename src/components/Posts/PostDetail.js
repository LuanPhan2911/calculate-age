import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleShowPostService } from "../../services/postServices";
import './PostDetail.scss';
import { FaUserAlt } from 'react-icons/fa';
import CommentList from "../Comments/CommentList";
const PostDetail = (props) => {
    const params = useParams();
    const [postDetail, setPostDetail] = useState({});
    let { post_id } = params;
    const fetchData = async (post_id) => {
        try {
            let res = await handleShowPostService({
                post_id: post_id
            });
            if (res && res.success) {
                setPostDetail(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (post_id) {
            fetchData(post_id);
        }
    }, [post_id]);
    return (
        <div className="post-detail-container">
            <div className="post-detail-header">
                <h4>Post show</h4>
            </div>
            <div className="post-detail-body">
                <div className="post-detail-title">
                    TP.HCM: Cháy tại một công ty ở Thủ Đức, công nhân chạy thoát thân
                </div>
                <div className="detail-author-post">
                    <div className="user-info">
                        <div className="user-name">Tran Duy Kanh</div>
                        <div className="user-email">Khanh@gmail.com</div>
                    </div>
                    <div className="created-at">
                        29-11-2003 - 12:20:21
                    </div>

                </div>
                <div className="post-detail-content">
                    Nhận tin báo, Đội Cảnh sát PCCC và CNCH phối hợp các đơn vị liên quan, nhanh chóng có mặt, tổ chức phương án cứu hộ cứu nạn, lấy lời khai những người liên quan để làm rõ nguyên nhân vụ việc.

                    Thời điểm xảy ra vụ cháy, trời mưa to và đám cháy nhanh chóng được dập tắt.
                </div>
            </div>
            <div className="post-detail-footer">
                <CommentList post_id={post_id} />
            </div>
        </div>
    )
}
export default PostDetail;